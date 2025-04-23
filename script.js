const API_URL = 'http://localhost:3000/api';

// Utility functions
const fetchData = async (endpoint) => {
    const response = await fetch(`${API_URL}/${endpoint}`);
    return response.json();
};

const createCard = (item, type) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => showDetails(item, type);

    let content = '';
    switch(type) {
        case 'vehicle':
            content = `
                <img src="${item.image || 'placeholder.jpg'}" alt="${item.brand} ${item.model}">
                <div class="card-content">
                    <h3>${item.brand} ${item.model}</h3>
                    <p>Año: ${item.year}</p>
                    <p>Kilometraje: ${item.mileage} km</p>
                    <p>Precio: $${item.price}</p>
                </div>
            `;
            break;
        case 'advisor':
            content = `
                <img src="${item.photo || 'advisor-placeholder.jpg'}" alt="${item.name}">
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p>${item.specialization}</p>
                </div>
            `;
            break;
        case 'location':
            content = `
                <img src="${item.image || 'location-placeholder.jpg'}" alt="${item.name}">
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p>${item.address}</p>
                </div>
            `;
            break;
        case 'insurance':
            content = `
                <img src="${item.logo || 'insurance-placeholder.jpg'}" alt="${item.name}">
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            break;
        case 'bank':
            content = `
                <img src="${item.logo || 'bank-placeholder.jpg'}" alt="${item.name}">
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            break;
    }
    
    card.innerHTML = content;
    return card;
};

const showDetails = (item, type) => {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    
    let content = '';
    switch(type) {
        case 'vehicle':
            content = `
                <h2>${item.brand} ${item.model}</h2>
                <img src="${item.image || 'placeholder.jpg'}" alt="${item.brand} ${item.model}">
                <div class="details">
                    <p><strong>Año:</strong> ${item.year}</p>
                    <p><strong>Kilometraje:</strong> ${item.mileage} km</p>
                    <p><strong>Precio:</strong> $${item.price}</p>
                    <p><strong>Tipo:</strong> ${item.type}</p>
                    <p><strong>Placa:</strong> ${item.plate}</p>
                    <button onclick="scheduleTestDrive('${item.id}')">Agendar Test Drive</button>
                </div>
            `;
            break;
        // Add other detail views for advisors, locations, insurance, and banks
    }
    
    modalContent.innerHTML = content;
    modal.style.display = 'block';
};

// Filter functions
let allVehicles = [];

const displayVehicles = async (vehicles) => {
    const container = document.getElementById('vehicleList');
    container.innerHTML = '';
    
    if (vehicles.length === 0) {
        container.innerHTML = '<p class="no-results">No se encontraron vehículos con los filtros seleccionados</p>';
        return;
    }

    vehicles.forEach(vehicle => {
        const card = document.createElement('div');
        card.className = 'vehicle-card';
        card.innerHTML = `
            <img src="${vehicle.image}" alt="${vehicle.brand} ${vehicle.model}">
            <div class="vehicle-info">
                <h3>${vehicle.brand} ${vehicle.model}</h3>
                <p class="vehicle-price">$${vehicle.price.toLocaleString('es-CO')}</p>
                <div class="vehicle-details">
                    <p><i class="fas fa-calendar"></i> ${vehicle.year}</p>
                    <p><i class="fas fa-road"></i> ${vehicle.mileage.toLocaleString('es-CO')} km</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${vehicle.location}</p>
                    <p><i class="fas fa-car"></i> ${vehicle.type}</p>
                    <p><i class="fas fa-hashtag"></i> Placa: ${vehicle.plate}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
};

window.applyFilters = async () => {
    const brand = document.getElementById('brand').value.toLowerCase();
    const model = document.getElementById('model').value.toLowerCase();
    const year = document.getElementById('year').value;
    const mileage = document.getElementById('mileage').value;
    const location = document.getElementById('location').value.toLowerCase();
    const type = document.getElementById('type').value.toLowerCase();
    const lastPlateDigit = document.getElementById('lastPlateDigit').value;

    // Get all vehicles if we haven't already
    if (allVehicles.length === 0) {
        allVehicles = await fetchData('vehicles');
    }

    // Filter vehicles based on criteria
    const filteredVehicles = allVehicles.filter(vehicle => {
        const matchBrand = !brand || vehicle.brand.toLowerCase().includes(brand);
        const matchModel = !model || vehicle.model.toLowerCase().includes(model);
        const matchYear = !year || vehicle.year === parseInt(year);
        const matchMileage = !mileage || vehicle.mileage <= parseInt(mileage);
        const matchLocation = !location || vehicle.location.toLowerCase().includes(location);
        const matchType = !type || vehicle.type.toLowerCase() === type;
        const matchPlate = !lastPlateDigit || vehicle.plate.slice(-1) === lastPlateDigit;

        return matchBrand && matchModel && matchYear && matchMileage && 
               matchLocation && matchType && matchPlate;
    });

    // Add animation class to the container
    const container = document.getElementById('vehicleList');
    container.classList.add('fade-out');

    // Wait for fade out animation
    setTimeout(() => {
        // Display filtered results
        displayVehicles(filteredVehicles);
        // Remove fade out and add fade in
        container.classList.remove('fade-out');
        container.classList.add('fade-in');
        // Remove fade in class after animation
        setTimeout(() => {
            container.classList.remove('fade-in');
        }, 500);
    }, 300);
};

window.clearFilters = () => {
    const filterInputs = [
        'brand', 'model', 'year', 'mileage', 
        'location', 'type', 'lastPlateDigit'
    ];

    // Clear all input values
    filterInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element.tagName === 'SELECT') {
            element.selectedIndex = 0;
        } else {
            element.value = '';
        }
    });

    // Show all vehicles
    displayVehicles(allVehicles);
};

// Display functions
const displayAdvisors = async () => {
    const advisors = await fetchData('advisors');
    const container = document.getElementById('advisorsList');
    container.innerHTML = '';
    advisors.forEach(advisor => {
        container.appendChild(createCard(advisor, 'advisor'));
    });
};

let map;
let markers = [];

const initMap = () => {
    // Center on Bogotá
    const bogota = [4.6097, -74.0817];
    map = L.map('map').setView(bogota, 11);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
};

const createLocationCard = (location) => {
    const card = document.createElement('div');
    card.className = 'location-card';
    card.innerHTML = `
        <img src="${location.image}" alt="${location.name}">
        <h3>${location.name}</h3>
        <p><strong>Dirección:</strong> ${location.address}</p>
        <p><strong>Teléfono:</strong> ${location.phone}</p>
        <p class="schedule">${location.schedule}</p>
    `;

    card.addEventListener('click', () => {
        // Remove active class from all cards
        document.querySelectorAll('.location-card').forEach(c => c.classList.remove('active'));
        // Add active class to clicked card
        card.classList.add('active');
        // Center map on location
        map.setView([location.lat, location.lng], 16);
        // Open popup for this location
        markers.find(m => m.locationId === location.id).openPopup();
    });

    return card;
};

const displayLocations = async () => {
    const locations = await fetchData('locations');
    const container = document.getElementById('locationsList');
    container.innerHTML = '';

    // Initialize map if it hasn't been initialized
    if (!map) {
        initMap();
    }

    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Add locations to list and map
    locations.forEach(location => {
        // Add location card
        container.appendChild(createLocationCard(location));

        // Add marker to map
        const marker = L.marker([location.lat, location.lng])
            .bindPopup(`
                <div style="min-width: 200px;">
                    <h3 style="margin: 0 0 10px 0;">${location.name}</h3>
                    <p style="margin: 5px 0;"><strong>Dirección:</strong> ${location.address}</p>
                    <p style="margin: 5px 0;"><strong>Teléfono:</strong> ${location.phone}</p>
                    <p style="margin: 5px 0;">${location.schedule}</p>
                </div>
            `)
            .addTo(map);

        marker.locationId = location.id;
        markers.push(marker);
    });

    // Fit map bounds to show all markers
    if (markers.length > 0) {
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
};

const displayInsurance = async () => {
    const companies = await fetchData('insurance');
    const container = document.getElementById('insuranceList');
    container.innerHTML = `
        <div class="insurance-controls">
            <button onclick="sortInsurancePolicies('asc')">Ordenar por Precio ↑</button>
            <button onclick="sortInsurancePolicies('desc')">Ordenar por Precio ↓</button>
        </div>
        <div class="insurance-grid"></div>
    `;

    const grid = container.querySelector('.insurance-grid');
    companies.forEach(company => {
        const card = document.createElement('div');
        card.className = 'insurance-card';
        
        // Sort policies by price initially
        const sortedPolicies = [...company.policies].sort((a, b) => a.price - b.price);
        
        const policiesList = sortedPolicies.map(policy => `
            <div class="policy-item">
                <h4>${policy.name}</h4>
                <p class="price">$${policy.price.toLocaleString('es-CO')}/año</p>
                <div class="coverage">
                    <strong>Cobertura:</strong>
                    <ul>
                        ${policy.coverage.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="benefits">
                    <strong>Beneficios:</strong>
                    <ul>
                        ${policy.benefits.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');

        card.innerHTML = `
            <div class="company-info">
                <img src="${company.logo}" alt="${company.name}" class="company-logo">
                <h3>${company.name}</h3>
                <p>${company.description}</p>
                <div class="contact-info">
                    <p><strong>Teléfono:</strong> ${company.contact.phone}</p>
                    <p><strong>Email:</strong> ${company.contact.email}</p>
                    <p><strong>Web:</strong> ${company.contact.website}</p>
                </div>
            </div>
            <div class="policies-container">
                <h3>Pólizas Disponibles</h3>
                <div class="policies-list" data-company-id="${company.id}">
                    ${policiesList}
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
};

// Function to sort insurance policies
window.sortInsurancePolicies = (order) => {
    const containers = document.querySelectorAll('.policies-list');
    containers.forEach(container => {
        const policies = Array.from(container.querySelectorAll('.policy-item'));
        const sortedPolicies = policies.sort((a, b) => {
            const priceA = parseInt(a.querySelector('.price').textContent.replace(/[^0-9]/g, ''));
            const priceB = parseInt(b.querySelector('.price').textContent.replace(/[^0-9]/g, ''));
            return order === 'asc' ? priceA - priceB : priceB - priceA;
        });
        
        container.innerHTML = '';
        sortedPolicies.forEach(policy => container.appendChild(policy));
    });
};

const displayBanks = async () => {
    const banks = await fetchData('banks');
    const container = document.getElementById('banksList');
    container.innerHTML = '';

    banks.forEach(bank => {
        const card = document.createElement('div');
        card.className = 'bank-card';
        
        const creditOptionsList = bank.creditOptions.map(option => `
            <div class="credit-option">
                <h4>${option.name}</h4>
                <div class="credit-details">
                    <div class="detail-item">
                        <span class="label">Tasa:</span>
                        <span class="value">${option.rate}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Plazo:</span>
                        <span class="value">${option.term}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Cuota inicial:</span>
                        <span class="value">${option.minDownPayment}</span>
                    </div>
                </div>
                <div class="benefits">
                    <strong>Beneficios:</strong>
                    <ul>
                        ${option.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');

        const requirementsList = bank.requirements.map(req => `<li>${req}</li>`).join('');

        card.innerHTML = `
            <div class="bank-info">
                <img src="${bank.logo}" alt="${bank.name}" class="bank-logo">
                <h3>${bank.name}</h3>
                <p class="bank-description">${bank.description}</p>
            </div>
            <div class="credit-options">
                <h3>Opciones de Crédito</h3>
                <div class="options-grid">
                    ${creditOptionsList}
                </div>
            </div>
            <div class="requirements-section">
                <h3>Requisitos</h3>
                <ul class="requirements-list">
                    ${requirementsList}
                </ul>
            </div>
            <div class="bank-contact">
                <h3>Contacto</h3>
                <p><i class="fas fa-phone"></i> ${bank.contact.phone}</p>
                <p><i class="fas fa-envelope"></i> ${bank.contact.email}</p>
                <p><i class="fas fa-globe"></i> ${bank.contact.website}</p>
            </div>
        `;

        container.appendChild(card);
    });
};

// Test Drive scheduling
const scheduleTestDrive = async (vehicleId) => {
    // Add test drive scheduling logic here
    console.log('Scheduling test drive for vehicle:', vehicleId);
};

// Modal close button
document.querySelector('.close').onclick = () => {
    document.getElementById('modal').style.display = 'none';
};

// Initial load
window.onload = async () => {
    allVehicles = await fetchData('vehicles');
    await displayVehicles(allVehicles);
    await displayAdvisors();
    await displayLocations();
    await displayInsurance();
    await displayBanks();
};
