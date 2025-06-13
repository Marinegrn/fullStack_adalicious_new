'use client';

import { useState, useEffect } from 'react';
import { MenuItem, CreateOrderRequest, Order } from '@/lib/types';
import { apiClient } from '@/lib/api';
import MenuCard from '@/components/Menu/MenuCard';
import OrderForm from '@/components/Order/OrderForm';
import OrderStatus from '@/components/Order/OrderStatus';

export default function CustomerPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Charger le menu au montage du composant
  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      setIsLoadingMenu(true);
      const response = await apiClient.getMenu();
      if (response.success && response.data) {
        setMenu(response.data);
      } else {
        setError('Erreur lors du chargement du menu');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Impossible de charger le menu');
    } finally {
      setIsLoadingMenu(false);
    }
  };

  const handleMenuItemSelect = (item: MenuItem) => {
    setSelectedItem(item);
    setError(null);
  };

  const handleOrderSubmit = async (orderData: CreateOrderRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiClient.createOrder(orderData);
      
      if (response.success && response.data) {
        // Récupérer les détails complets de la commande
        const orderDetails = await apiClient.getOrderById(response.data.id);
        if (orderDetails.success && orderDetails.data) {
          setCompletedOrder(orderDetails.data);
          setSelectedItem(null);
        }
      } else {
        setError(response.message || 'Erreur lors de la création de la commande');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Impossible de créer la commande');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewOrder = () => {
    setCompletedOrder(null);
    setSelectedItem(null);
    setError(null);
  };

  if (completedOrder) {
    return (
      <div className="max-w-md mx-auto">
        <OrderStatus order={completedOrder} />
        <div className="mt-6 text-center">
          <button 
            onClick={handleNewOrder}
            className="btn btn-secondary"
          >
            Nouvelle commande
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🍽️ Notre Menu
        </h1>
        <p className="text-gray-600">
          Sélectionnez votre plat préféré et passez votre commande
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="text-red-400">⚠️</div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Plats disponibles
          </h2>
          
          {isLoadingMenu ? (
            <div className="grid md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {menu.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onSelect={handleMenuItemSelect}
                  isSelected={selectedItem?.id === item.id}
                />
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Votre commande
          </h2>
          <OrderForm
            selectedItem={selectedItem}
            onSubmit={handleOrderSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}