

// Navigation smooth scroll
document.addEventListener('DOMContentLoaded', function() {
    
    // Liens de navigation smooth scroll
    const liensNav = document.querySelectorAll('.G');
    
    liensNav.forEach(lien => {
        lien.addEventListener('click', function(e) {
            e.preventDefault();
            
            const cible = this.getAttribute('href');
            const section = document.querySelector(cible);
            
            if (section) {
                const position = section.offsetTop - 80;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Formulaire de contact
    const formulaire = document.querySelector('.BE');
    
    if (formulaire) {
        formulaire.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données
            const nom = document.getElementById('nom').value;
            const email = document.getElementById('email').value;
            const sujet = document.getElementById('sujet').value;
            const message = document.getElementById('message').value;
            
            // Vérifier si tous les champs sont remplis
            if (!nom || !email || !sujet || !message) {
                afficherMessage('Veuillez remplir tous les champs', 'erreur');
                return;
            }
            
            // Vérifier l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                afficherMessage('Veuillez entrer une adresse email valide', 'erreur');
                return;
            }
            
            // Simuler l'envoi
            afficherMessage('Message envoyé avec succès!', 'succes');
            this.reset();
        });
    }

    // Fonction pour afficher des messages
    function afficherMessage(texte, type) {
        // Créer le message
        const message = document.createElement('div');
        message.className = `message message-${type}`;
        message.textContent = texte;
        
        // Style du message
        message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        // Couleur selon le type
        if (type === 'succes') {
            message.style.background = '#28a745';
        } else if (type === 'erreur') {
            message.style.background = '#dc3545';
        } else {
            message.style.background = '#007bff';
        }
        
        // Ajouter à la page
        document.body.appendChild(message);
        
        // Animation d'entrée
        setTimeout(() => {
            message.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto-suppression après 3 secondes
        setTimeout(() => {
            message.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (message.parentNode) {
                    document.body.removeChild(message);
                }
            }, 300);
        }, 3000);
    }

    // Animation des barres de compétences
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const barres = entry.target.querySelectorAll('.AQ');
                barres.forEach(barre => {
                    const largeur = barre.style.width;
                    barre.style.width = '0%';
                    setTimeout(() => {
                        barre.style.width = largeur;
                    }, 200);
                });
            }
        });
    }, observerOptions);

    const competences = document.querySelector('.AM');
    if (competences) {
        observer.observe(competences);
    }

    // Effet sur les cartes de projet
    const cartesProjet = document.querySelectorAll('.W');
    
    cartesProjet.forEach(carte => {
        carte.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        carte.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Menu mobile simple
    function creerMenuMobile() {
        const entete = document.querySelector('.C');
        const navigation = document.querySelector('.E');
        
        // Créer le bouton menu
        const boutonMenu = document.createElement('button');
        boutonMenu.className = 'bouton-menu';
        boutonMenu.innerHTML = '☰';
        boutonMenu.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #333;
        `;
        
        entete.insertBefore(boutonMenu, navigation);
        
        // Toggle menu
        boutonMenu.addEventListener('click', function() {
            navigation.classList.toggle('menu-actif');
            this.textContent = navigation.classList.contains('menu-actif') ? '✕' : '☰';
        });
        
        // Responsive
        function verifierMobile() {
            if (window.innerWidth <= 768) {
                boutonMenu.style.display = 'block';
                navigation.style.display = 'none';
            } else {
                boutonMenu.style.display = 'none';
                navigation.style.display = 'flex';
                navigation.classList.remove('menu-actif');
            }
        }
        
        window.addEventListener('resize', verifierMobile);
        verifierMobile();
        
        // Style pour le menu mobile
        const style = document.createElement('style');
        style.textContent = `
            .menu-actif {
                display: flex !important;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            
            .menu-actif .F {
                flex-direction: column;
                gap: 1rem;
            }
        `;
        document.head.appendChild(style);
    }
    
    creerMenuMobile();

    // Animation simple au scroll
    window.addEventListener('scroll', function() {
        const entete = document.querySelector('.B');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            entete.style.background = 'rgba(255, 255, 255, 0.95)';
            entete.style.backdropFilter = 'blur(10px)';
        } else {
            entete.style.background = '#fff';
            entete.style.backdropFilter = 'none';
        }
    });

    // Animation d'écriture pour le titre
    const titreAccueil = document.querySelector('.L');
    if (titreAccueil) {
        const texteOriginal = titreAccueil.textContent;
        titreAccueil.textContent = '';
        let index = 0;
        
        function ecrireTexte() {
            if (index < texteOriginal.length) {
                titreAccueil.textContent += texteOriginal.charAt(index);
                index++;
                setTimeout(ecrireTexte, 50);
            }
        }
        
        setTimeout(ecrireTexte, 500);
    }
});
