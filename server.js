const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Serve home.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Sample data (replace with database later)
const vehicles = [
    {
        id: '1',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2023,
        mileage: 15000,
        price: 25000,
        location: 'Bogotá',
        type: 'sedan',
        plate: 'ABC123',
        image: 'https://img.freepik.com/free-photo/white-premium-city-car-with-blue-tint_114579-5035.jpg'
    },
    {
        id: '2',
        brand: 'Honda',
        model: 'CR-V',
        year: 2022,
        mileage: 25000,
        price: 32000,
        location: 'Medellín',
        type: 'suv',
        plate: 'XYZ789',
        image: 'https://img.freepik.com/free-photo/blue-sport-sedan-parked-yard_114579-5078.jpg'
    },
    {
        id: '3',
        brand: 'Ford',
        model: 'Ranger',
        year: 2024,
        mileage: 5000,
        price: 45000,
        location: 'Cali',
        type: 'pickup',
        plate: 'DEF456',
        image: 'https://img.freepik.com/free-photo/blue-black-muscle-car-with-license-plate-that-says-trans-front_1340-23399.jpg'
    },
    {
        id: '4',
        brand: 'Toyota',
        model: 'RAV4',
        year: 2023,
        mileage: 18000,
        price: 35000,
        location: 'Bogotá',
        type: 'suv',
        plate: 'GHI789',
        image: 'https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg'
    },
    {
        id: '5',
        brand: 'Chevrolet',
        model: 'Cruze',
        year: 2022,
        mileage: 30000,
        price: 22000,
        location: 'Medellín',
        type: 'sedan',
        plate: 'JKL012',
        image: 'https://img.freepik.com/free-photo/white-luxury-sport-sedan-car-standing-race-track_114579-1162.jpg'
    }
];
const advisors = [
    {
        id: '1',
        name: 'Ana María González',
        specialization: 'Vehículos de Lujo',
        experience: '8 años',
        email: 'ana.gonzalez@ejemplo.com',
        phone: '(601) 123-4567',
        location: 'Bogotá',
        photo: 'https://img.freepik.com/free-photo/confident-business-woman-portrait-smiling-face_53876-137693.jpg'
    },
    {
        id: '2',
        name: 'Carlos Rodríguez',
        specialization: 'SUVs y Camionetas',
        experience: '5 años',
        email: 'carlos.rodriguez@ejemplo.com',
        phone: '(604) 234-5678',
        location: 'Medellín',
        photo: 'https://img.freepik.com/free-photo/young-businessman-suit-glasses-cross-arms-chest-look_176420-21750.jpg'
    },
    {
        id: '3',
        name: 'Laura Martínez',
        specialization: 'Vehículos Familiares',
        experience: '6 años',
        email: 'laura.martinez@ejemplo.com',
        phone: '(602) 345-6789',
        location: 'Cali',
        photo: 'https://img.freepik.com/free-photo/portrait-young-businesswoman-holding-eyeglasses-hand-against-gray-backdrop_23-2148029483.jpg'
    },
    {
        id: '4',
        name: 'Juan Pablo Herrera',
        specialization: 'Vehículos Deportivos',
        experience: '7 años',
        email: 'juan.herrera@ejemplo.com',
        phone: '(601) 456-7890',
        location: 'Bogotá',
        photo: 'https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg'
    }
];
const locations = [
    {
        id: '1',
        name: 'Sede Principal - Usaquén',
        address: 'Calle 116 #7-15',
        city: 'Bogotá',
        phone: '(601) 123-4567',
        schedule: 'Lunes a Sábado: 9:00 AM - 7:00 PM',
        lat: 4.6927,
        lng: -74.0311,
        image: 'https://img.freepik.com/free-photo/modern-corporate-building_1127-3072.jpg'
    },
    {
        id: '2',
        name: 'Sede Chapinero',
        address: 'Carrera 13 #63-25',
        city: 'Bogotá',
        phone: '(601) 234-5678',
        schedule: 'Lunes a Sábado: 8:00 AM - 6:00 PM',
        lat: 4.6486,
        lng: -74.0628,
        image: 'https://img.freepik.com/free-photo/modern-business-building-with-glass-wall-from-empty-floor_1127-3154.jpg'
    },
    {
        id: '3',
        name: 'Sede Salitre',
        address: 'Avenida El Dorado #68C-61',
        city: 'Bogotá',
        phone: '(601) 345-6789',
        schedule: 'Lunes a Sábado: 9:00 AM - 7:00 PM',
        lat: 4.6577,
        lng: -74.1053,
        image: 'https://img.freepik.com/free-photo/3d-rendering-business-building_23-2149143177.jpg'
    }
];
const insuranceCompanies = [
    {
        id: '1',
        name: 'Seguros Bolivar',
        description: 'Protección integral para tu vehículo con más de 80 años de experiencia',
        policies: [
            {
                name: 'Todo Riesgo Premium',
                coverage: ['Daños', 'Robo', 'Responsabilidad Civil', 'Asistencia 24/7', 'Vehículo de reemplazo'],
                price: 1200000,
                benefits: ['Grúa sin límite de eventos', 'Conductor elegido', 'Taller autorizado premium']
            },
            {
                name: 'Cobertura Básica Plus',
                coverage: ['Daños', 'Robo', 'Responsabilidad Civil'],
                price: 800000,
                benefits: ['Grúa hasta 3 eventos', 'Taller autorizado']
            }
        ],
        contact: {
            phone: '(601) 123-4567',
            email: 'atencion@segurosbolivar.com',
            website: 'www.segurosbolivar.com'
        },
        logo: 'https://img.freepik.com/free-vector/abstract-insurance-logo_23-2148501091.jpg'
    },
    {
        id: '2',
        name: 'Sura Seguros',
        description: 'Soluciones personalizadas para la protección de tu vehículo',
        policies: [
            {
                name: 'Póliza Elite',
                coverage: ['Daños', 'Robo', 'Responsabilidad Civil Ampliada', 'Asistencia Premium', 'Conductor Elegido'],
                price: 1500000,
                benefits: ['Grúa ilimitada', 'Taller premium', 'Vehículo de reemplazo hasta 30 días']
            },
            {
                name: 'Póliza Estándar',
                coverage: ['Daños', 'Robo', 'Responsabilidad Civil'],
                price: 900000,
                benefits: ['Grúa hasta 5 eventos', 'Taller autorizado']
            }
        ],
        contact: {
            phone: '(604) 444-8888',
            email: 'servicios@sura.com',
            website: 'www.sura.com'
        },
        logo: 'https://img.freepik.com/free-vector/abstract-protection-logo_23-2148501024.jpg'
    },
    {
        id: '3',
        name: 'Liberty Seguros',
        description: 'Innovación y confianza en seguros vehiculares',
        policies: [
            {
                name: 'Protección Total',
                coverage: ['Daños', 'Robo', 'Responsabilidad Civil', 'Asistencia VIP', 'Pérdida Total'],
                price: 1300000,
                benefits: ['Grúa sin límite', 'Taller premium', 'Vehículo de reemplazo hasta 15 días']
            },
            {
                name: 'Cobertura Esencial',
                coverage: ['Daños', 'Robo', 'Responsabilidad Civil Básica'],
                price: 750000,
                benefits: ['Grúa hasta 3 eventos', 'Taller autorizado básico']
            }
        ],
        contact: {
            phone: '(601) 307-7777',
            email: 'atencion@liberty.com',
            website: 'www.liberty.com'
        },
        logo: 'https://img.freepik.com/free-vector/abstract-shield-logo_23-2148501078.jpg'
    }
];
const banks = [
    {
        id: '1',
        name: 'Bancolombia',
        description: 'Soluciones financieras flexibles para tu nuevo vehículo',
        creditOptions: [
            {
                name: 'Crédito Vehículo Plus',
                rate: '0.95% M.V.',
                term: 'Hasta 84 meses',
                minDownPayment: '10%',
                benefits: [
                    'Aprobación en 24 horas',
                    'Seguro de vida incluido',
                    'Sin penalidad por pago anticipado'
                ]
            },
            {
                name: 'Leasing Vehícular',
                rate: '0.89% M.V.',
                term: 'Hasta 60 meses',
                minDownPayment: '20%',
                benefits: [
                    'Beneficios tributarios',
                    'Opción de compra desde 1%',
                    'Cuotas flexibles'
                ]
            }
        ],
        requirements: [
            'Ingresos mínimos de 2.5 SMMLV',
            'Antigüedad laboral de 6 meses',
            'No estar reportado en centrales de riesgo'
        ],
        contact: {
            phone: '(601) 343-0000',
            email: 'vehiculos@bancolombia.com.co',
            website: 'www.bancolombia.com.co'
        },
        logo: 'https://img.freepik.com/free-vector/bank-logo-template_1195-191.jpg'
    },
    {
        id: '2',
        name: 'Banco Davivienda',
        description: 'Tu carro nuevo con las mejores tasas del mercado',
        creditOptions: [
            {
                name: 'Crédito de Vehículo Davivienda',
                rate: '0.99% M.V.',
                term: 'Hasta 72 meses',
                minDownPayment: '15%',
                benefits: [
                    'Tasa preferencial para clientes Davivienda',
                    'Débito automático',
                    'Aprobación express'
                ]
            },
            {
                name: 'Plan Empresarios',
                rate: '0.92% M.V.',
                term: 'Hasta 60 meses',
                minDownPayment: '20%',
                benefits: [
                    'Tasa preferencial',
                    'Estudio crediticio sin costo',
                    'Asesoría especializada'
                ]
            }
        ],
        requirements: [
            'Ingresos mínimos de 2 SMMLV',
            'Antigüedad laboral de 12 meses',
            'Buen historial crediticio'
        ],
        contact: {
            phone: '(601) 333-0000',
            email: 'creditos@davivienda.com',
            website: 'www.davivienda.com'
        },
        logo: 'https://img.freepik.com/free-vector/modern-bank-logo-template_1195-155.jpg'
    },
    {
        id: '3',
        name: 'Banco BBVA',
        description: 'Financiación ágil y competitiva para estrenar tu vehículo',
        creditOptions: [
            {
                name: 'BBVA Auto',
                rate: '0.97% M.V.',
                term: 'Hasta 84 meses',
                minDownPayment: '10%',
                benefits: [
                    'Respuesta en 24 horas',
                    'Cuota extraordinaria opcional',
                    'Seguro de desempleo opcional'
                ]
            },
            {
                name: 'BBVA Leasing',
                rate: '0.91% M.V.',
                term: 'Hasta 72 meses',
                minDownPayment: '15%',
                benefits: [
                    'Beneficios fiscales',
                    'Opción de compra flexible',
                    'Plazo personalizado'
                ]
            }
        ],
        requirements: [
            'Ingresos mínimos de 2 SMMLV',
            'Antigüedad laboral de 8 meses',
            'Edad entre 18 y 70 años'
        ],
        contact: {
            phone: '(601) 401-0000',
            email: 'autobbva@bbva.com.co',
            website: 'www.bbva.com.co'
        },
        logo: 'https://img.freepik.com/free-vector/bank-logo-design_1195-150.jpg'
    }
];
const testDrives = [];

// Vehicle routes
app.get('/api/vehicles', (req, res) => {
    let filteredVehicles = [...vehicles];
    
    // Apply filters based on query parameters
    if (req.query.brand) {
        filteredVehicles = filteredVehicles.filter(v => v.brand.toLowerCase() === req.query.brand.toLowerCase());
    }
    if (req.query.model) {
        filteredVehicles = filteredVehicles.filter(v => v.model.toLowerCase() === req.query.model.toLowerCase());
    }
    if (req.query.year) {
        filteredVehicles = filteredVehicles.filter(v => v.year === parseInt(req.query.year));
    }
    if (req.query.mileage) {
        filteredVehicles = filteredVehicles.filter(v => v.mileage <= parseInt(req.query.mileage));
    }
    if (req.query.location) {
        filteredVehicles = filteredVehicles.filter(v => v.location.toLowerCase() === req.query.location.toLowerCase());
    }
    if (req.query.type) {
        filteredVehicles = filteredVehicles.filter(v => v.type.toLowerCase() === req.query.type.toLowerCase());
    }
    if (req.query.lastPlateDigit) {
        filteredVehicles = filteredVehicles.filter(v => v.plate.slice(-1) === req.query.lastPlateDigit);
    }

    res.json(filteredVehicles);
});

app.get('/api/vehicles/:id', (req, res) => {
    const vehicle = vehicles.find(v => v.id === req.params.id);
    if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
});

// Advisor routes
app.get('/api/advisors', (req, res) => {
    res.json(advisors);
});

app.get('/api/advisors/:id', (req, res) => {
    const advisor = advisors.find(a => a.id === req.params.id);
    if (!advisor) {
        return res.status(404).json({ message: 'Advisor not found' });
    }
    res.json(advisor);
});

// Insurance company routes
app.get('/api/insurance', (req, res) => {
    res.json(insuranceCompanies);
});

app.get('/api/insurance/:id', (req, res) => {
    const company = insuranceCompanies.find(i => i.id === req.params.id);
    if (!company) {
        return res.status(404).json({ message: 'Insurance company not found' });
    }
    res.json(company);
});

// Bank routes
app.get('/api/banks', (req, res) => {
    res.json(banks);
});

app.get('/api/banks/:id', (req, res) => {
    const bank = banks.find(b => b.id === req.params.id);
    if (!bank) {
        return res.status(404).json({ message: 'Bank not found' });
    }
    res.json(bank);
});

// Location routes
app.get('/api/locations', (req, res) => {
    res.json(locations);
});

app.get('/api/locations/:id', (req, res) => {
    const location = locations.find(l => l.id === req.params.id);
    if (!location) {
        return res.status(404).json({ message: 'Location not found' });
    }
    res.json(location);
});

// Test drive routes
app.post('/api/test-drives', (req, res) => {
    const testDrive = {
        id: Date.now().toString(),
        ...req.body,
        status: 'pending'
    };
    testDrives.push(testDrive);
    res.status(201).json(testDrive);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
