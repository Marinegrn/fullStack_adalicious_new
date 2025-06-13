'use client';

import { useState } from 'react';
import { MenuItem, CreateOrderRequest } from '@/lib/types';

interface OrderFormProps {
  selectedItem: MenuItem | null;
  onSubmit: (orderData: CreateOrderRequest) => void;
  isLoading: boolean;
}

export default function OrderForm({ selectedItem, onSubmit, isLoading }: OrderFormProps) {
  const [customerName, setCustomerName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedItem || !customerName.trim()) {
      return;
    }

    onSubmit({
      customer_name: customerName.trim(),
      menu_item_id: selectedItem.id
    });
  };

  if (!selectedItem) {
    return (
      <div className="card p-6 text-center">
        <div className="text-gray-400 text-4xl mb-4">🍽️</div>
        <p className="text-gray-600">
          Sélectionnez un plat pour continuer votre commande
        </p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Finaliser la commande
      </h3>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{selectedItem.image}</span>
          <div>
            <h4 className="font-medium text-gray-900">{selectedItem.plate}</h4>
            <p className="text-sm text-gray-600">{selectedItem.description}</p>
            {selectedItem.price && (
              <p className="text-sm font-semibold text-primary-600">
                {selectedItem.price.toFixed(2)}€
              </p>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
            Votre nom
          </label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="input"
            placeholder="Entrez votre nom"
            required
            disabled={isLoading}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary w-full"
          disabled={isLoading || !customerName.trim()}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Commande en cours...
            </span>
          ) : (
            'Confirmer la commande'
          )}
        </button>
      </form>
    </div>
  );
}