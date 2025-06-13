import { OrderStatus } from './types';

export const getStatusLabel = (status: OrderStatus): string => {
  const labels = {
    [OrderStatus.PENDING]: 'En attente',
    [OrderStatus.IN_PREPARATION]: 'En préparation',
    [OrderStatus.READY]: 'Prête',
    [OrderStatus.DELIVERED]: 'Livrée'
  };
  
  return labels[status] || status;
};

export const getStatusColor = (status: OrderStatus): string => {
  const colors = {
    [OrderStatus.PENDING]: 'bg-gray-100 text-gray-800',
    [OrderStatus.IN_PREPARATION]: 'bg-warning-50 text-warning-600',
    [OrderStatus.READY]: 'bg-success-50 text-success-600',
    [OrderStatus.DELIVERED]: 'bg-primary-50 text-primary-600'
  };
  
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};