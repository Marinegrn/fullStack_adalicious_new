import { Request, Response } from 'express';
import { query } from '../config/database';
import { Order, CreateOrderRequest, UpdateOrderRequest, OrderStatus } from '../types';

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await query(`
      SELECT 
        o.id,
        o.customer_name,
        o.menu_item_id,
        o.status,
        o.created_at,
        o.updated_at,
        m.plate,
        m.description,
        m.image,
        m.price
      FROM orders o
      JOIN menu m ON o.menu_item_id = m.id
      ORDER BY o.created_at ASC
    `);

    const orders = result.rows.map(row => ({
      id: row.id,
      customer_name: row.customer_name,
      menu_item_id: row.menu_item_id,
      status: row.status,
      created_at: row.created_at,
      updated_at: row.updated_at,
      menu_item: {
        id: row.menu_item_id,
        plate: row.plate,
        description: row.description,
        image: row.image,
        price: row.price
      }
    }));

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des commandes'
    });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(`
      SELECT 
        o.id,
        o.customer_name,
        o.menu_item_id,
        o.status,
        o.created_at,
        o.updated_at,
        m.plate,
        m.description,
        m.image,
        m.price
      FROM orders o
      JOIN menu m ON o.menu_item_id = m.id
      WHERE o.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée'
      });
    }

    const row = result.rows[0];
    const order = {
      id: row.id,
      customer_name: row.customer_name,
      menu_item_id: row.menu_item_id,
      status: row.status,
      created_at: row.created_at,
      updated_at: row.updated_at,
      menu_item: {
        id: row.menu_item_id,
        plate: row.plate,
        description: row.description,
        image: row.image,
        price: row.price
      }
    };

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la commande:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération de la commande'
    });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customer_name, menu_item_id }: CreateOrderRequest = req.body;

    if (!customer_name || !menu_item_id) {
      return res.status(400).json({
        success: false,
        message: 'Le nom du client et l\'ID du plat sont requis'
      });
    }

    // Vérifier que le plat existe
    const menuCheck = await query('SELECT id FROM menu WHERE id = $1', [menu_item_id]);
    if (menuCheck.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Plat non trouvé'
      });
    }

    const result = await query(`
      INSERT INTO orders (customer_name, menu_item_id, status)
      VALUES ($1, $2, $3)
      RETURNING id, customer_name, menu_item_id, status, created_at, updated_at
    `, [customer_name, menu_item_id, OrderStatus.PENDING]);

    const newOrder = result.rows[0];

    res.status(201).json({
      success: true,
      data: newOrder,
      message: 'Commande créée avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création de la commande'
    });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status }: UpdateOrderRequest = req.body;

    if (!status || !Object.values(OrderStatus).includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Statut invalide'
      });
    }

    const result = await query(`
      UPDATE orders 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id, customer_name, menu_item_id, status, created_at, updated_at
    `, [status, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée'
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
      message: 'Commande mise à jour avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la commande:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la mise à jour de la commande'
    });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM orders WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée'
      });
    }

    res.json({
      success: true,
      message: 'Commande supprimée avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la commande:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la suppression de la commande'
    });
  }
};