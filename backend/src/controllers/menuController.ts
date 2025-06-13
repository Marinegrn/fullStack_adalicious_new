import { Request, Response } from 'express';
import { query } from '../config/database';
import { MenuItem } from '../types';

export const getMenu = async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM menu ORDER BY id');
    const menu: MenuItem[] = result.rows;
    
    res.json({
      success: true,
      data: menu
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du menu:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération du menu'
    });
  }
};