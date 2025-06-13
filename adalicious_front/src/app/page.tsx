import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🥦 Bienvenue chez Adalicious
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Votre restaurant de développeurs préféré ! Gérez vos commandes en temps réel.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="card p-8 text-center hover:shadow-md transition-shadow">
            <div className="text-6xl mb-4">👨‍💻</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Espace Client
            </h2>
            <p className="text-gray-600 mb-6">
              Consultez notre menu et passez votre commande facilement
            </p>
            <Link href="/customer" className="btn btn-primary">
              Passer commande
            </Link>
          </div>
          
          <div className="card p-8 text-center hover:shadow-md transition-shadow">
            <div className="text-6xl mb-4">👨‍🍳</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Espace Cuisine
            </h2>
            <p className="text-gray-600 mb-6">
              Gérez les commandes et mettez à jour leur statut
            </p>
            <Link href="/kitchen" className="btn btn-primary">
              Accès cuisine
            </Link>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-primary-50 rounded-lg">
          <h3 className="text-lg font-semibold text-primary-900 mb-2">
            🚀 Fonctionnalités
          </h3>
          <ul className="text-primary-800 space-y-1">
            <li>• Menu interactif avec descriptions</li>
            <li>• Commandes en temps réel</li>
            <li>• Suivi du statut de préparation</li>
            <li>• Interface dédiée pour la cuisine</li>
          </ul>
        </div>
      </div>
    </div>
  );
}