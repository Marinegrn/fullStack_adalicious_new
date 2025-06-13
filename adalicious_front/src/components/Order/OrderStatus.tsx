'use client';

import { Order } from '@/lib/types';
import { getStatusLabel, getStatusColor, formatTime } from '@/lib/utils';

interface OrderStatusProps {
  order: Order;
}

export default function OrderStatus({ order }: OrderStatusProps) {
  return (
    <div className="card p-6">
      <div className="text-center mb-6">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Commande confirmée !
        </h3>
        <p className="text-gray-600">
          Merci {order.customer_name}, votre commande a été enregistrée.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">{order.menu_item?.image}</span>
            <div>
              <h4 className="font-medium text-gray-900">
                {order.menu_item?.plate}
              </h4>
              <p className="text-sm text-gray-600">
                {order.menu_item?.description}
              </p>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">
              Commande n° {order.id.slice(0, 8)}
            </span>
            <span className="text-gray-600">
              {formatTime(order.created_at)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Statut actuel :
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
            {getStatusLabel(order.status)}
          </span>
        </div>

        <div className="bg-primary-50 p-4 rounded-lg">
          <p className="text-sm text-primary-800">
            💡 <strong>Astuce :</strong> Votre commande sera préparée dans l&#39;ordre d&#39;arrivée. 
            Vous serez notifié quand elle sera prête !
          </p>
        </div>
      </div>
    </div>
  );
}