# 👥 User Management WebUI

Een moderne Angular applicatie voor gebruikersbeheer met real-time updates via SignalR.

## 🚀 Features

- ✅ **CRUD Operaties** - Gebruikers toevoegen, bekijken en verwijderen
- ✅ **Real-time Updates** - SignalR integratie voor live synchronisatie
- ✅ **Paginatie** - 25 gebruikers per pagina voor betere performance
- ✅ **Validatie** - Email en wachtwoord validatie
- ✅ **Responsive Design** - Werkt op desktop en mobiel
- ✅ **Modern UI** - Schone, gebruiksvriendelijke interface

## 🛠️ Technologieën

- **Angular 19** (Standalone Components)
- **TypeScript**
- **RxJS** voor reactive programming
- **SignalR** voor real-time communicatie
- **SCSS** voor styling
- **Vite** als build tool

## 📋 Vereisten

- Node.js (v18 of hoger)
- npm (v9 of hoger)
- Backend API draaiend op `http://localhost:5151`

## 🏃‍♂️ Installatie

1. Clone de repository:
```bash
git clone https://github.com/tamer4k/user-management-WebUI.git
cd user-management-WebUI
```

2. Installeer dependencies:
```bash
npm install
```

3. Start de development server:
```bash
npm start
```

4. Open je browser en ga naar `http://localhost:4200`

## 📦 Project Structuur

```
src/
├── app/
│   ├── components/
│   │   ├── add-user/          # Formulier voor nieuwe gebruikers
│   │   └── user-list/         # Lijst met paginatie
│   ├── services/
│   │   └── user.service.ts    # API communicatie
│   ├── app.component.ts       # Root component
│   └── app.routes.ts          # Routing configuratie
├── environment.ts             # Environment variabelen
└── index.html
```

## 🔌 API Endpoints

De applicatie communiceert met deze endpoints:

- `GET /api/users` - Haal alle gebruikers op
- `POST /api/users` - Voeg een nieuwe gebruiker toe
- `DELETE /api/users/{id}` - Verwijder een gebruiker
- `PUT /api/users/{id}` - Update een gebruiker

## 📱 SignalR Hub

- **Hub URL**: `http://localhost:5151/userHub`
- **Event**: `UserChanged` - Wordt gefired bij wijzigingen

## 🎨 Componenten

### Add User Component
Formulier voor het toevoegen van nieuwe gebruikers met validatie:
- Naam (verplicht)
- Email (verplicht, uniek)
- Wachtwoord (verplicht, min. 6 karakters)

### User List Component
Lijst met gebruikers inclusief:
- Paginatie (25 per pagina)
- Real-time updates via SignalR
- Verwijder functionaliteit
- Info balk met statistieken

## 🔧 Build

Production build maken:
```bash
npm run build
```

De build output komt in de `dist/` directory.

## 🤝 Backend Repository

Deze frontend werkt samen met de ASP.NET Core API:
- Repository: `UserManagementAPI`
- Technologie: ASP.NET Core 9.0, Entity Framework Core, SignalR

## 📝 Environment Configuratie

Pas `src/environment.ts` aan voor je eigen API URL:

```typescript
export const environment = {
  apiBaseUrl: 'http://localhost:5151',
  production: false
};
```

## 🐛 Troubleshooting

### SignalR verbinding mislukt
- Zorg dat de backend draait op `http://localhost:5151`
- Check CORS instellingen in de backend
- Controleer browser console voor errors

### Paginatie werkt niet
- Refresh de pagina
- Check of er data is geladen (browser developer tools)

## 📄 License

Dit project is gemaakt voor educatieve doeleinden.

## 👨‍💻 Auteur

Tamer Al-Ashraf

---

⭐ Vergeet niet om de repository een ster te geven als je het nuttig vindt!
