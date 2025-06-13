'use client';

import { Order, OrderStatus } from '@/lib/types';
import { getStatusLabel, getStatusColor, formatTime } from '@/lib/utils';

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  onDelete: (orderId: string) => void;
  isUpdating: boolean;
}

export default function OrderCard({ order, onUpdateStatus, onDelete, isUpdating }: OrderCardProps) {
  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    switch (currentStatus) {
      case OrderStatus.PENDING:
        return OrderStatus.IN_PREPARATION;
      case OrderStatus.IN_PREPARATION:
        return OrderStatus.READY;
      case OrderStatus.READY:
        return OrderStatus.DELIVERED;
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus(order.status);

  const getActionLabel = (status: OrderStatus): string => {
    switch (status) {
      case OrderStatus.IN_PREPARATION:
        return 'Commencer la préparation';
      case OrderStatus.READY:
        return 'Marquer comme prête';
      case OrderStatus.DELIVERED:
        return 'Marquer comme livrée';
      default:
        return 'Mettre à jour';
    }
  };

  return (
      <div className="card p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                  <span className="text-2xl">{order.menu_item?.image}</span>
                  <div>
                      <h3 className="font-semibold text-gray-900">
                          {order.customer_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                          {order.menu_item?.plate}
                      </p>
                  </div>
              </div>
              <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                      {formatTime(order.created_at)}
                  </p>
              </div>
          </div>

          <div className="mb-4">
              <p className="text-sm text-gray-600">
                  {order.menu_item?.description}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                  Commande n° {order.id.slice(0, 8)}
              </p>
          </div>

          <div className="flex items-center justify-between">
              {nextStatus && (
                  <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                      onClick={() => onUpdateStatus(order.id, nextStatus)}
                      disabled={isUpdating}
                  >
                      {getActionLabel(nextStatus)}
                  </button>
              )}
              <button
                  className="ml-2 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors disabled:opacity-50"
                  onClick={() => onDelete(order.id)}
                  disabled={isUpdating}
              >
                  Supprimer
              </button>
          </div>
      </div>
  );
}