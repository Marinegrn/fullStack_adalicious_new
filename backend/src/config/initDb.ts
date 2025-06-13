import { query } from './database';

export const initializeDatabase = async () => {
  try {
    // Créer la table menu
    await query(`
      CREATE TABLE IF NOT EXISTS menu (
        id SERIAL PRIMARY KEY,
        plate VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(10) NOT NULL,
        price DECIMAL(10,2) DEFAULT 10.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Créer la table orders
    await query(`
      CREATE TABLE IF NOT EXISTS orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        customer_name VARCHAR(255) NOT NULL,
        menu_item_id INTEGER REFERENCES menu(id),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insérer les données du menu si la table est vide
    const menuCount = await query('SELECT COUNT(*) FROM menu');
    if (parseInt(menuCount.rows[0].count) === 0) {
      const menuItems = [
        {
          plate: "Hello World Burger",
          description: "Un cheeseburger classique (pain, steak, fromage, salade, sauce).",
          image: "🍔"
        },
        {
          plate: "404 Not Found Fries",
          description: "Des frites maison avec une sauce mystère (choisie aléatoirement par le backend !).",
          image: "🍟"
        },
        {
          plate: "JSON Nuggets",
          description: "Nuggets de poulet avec 3 sauces au choix (ketchup, mayo, barbecue).",
          image: "🍗"
        },
        {
          plate: "Git Pull Tacos",
          description: "Un taco simple avec poulet, salade, fromage et sauce.",
          image: "🌮"
        },
        {
          plate: "Front-end Salad",
          description: "Une salade légère avec tomates, feta et vinaigrette maison.",
          image: "🥗"
        },
        {
          plate: "Back-End Brownie",
          description: "Un brownie moelleux au chocolat.",
          image: "🍫"
        },
        {
          plate: "Full Stack Menu",
          description: "Un combo burger, frites et boisson.",
          image: "🍽️"
        }
      ];

      for (const item of menuItems) {
        await query(
          'INSERT INTO menu (plate, description, image) VALUES ($1, $2, $3)',
          [item.plate, item.description, item.image]
        );
      }
    }

    console.log('✅ Base de données initialisée avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
    throw error;
  }
};