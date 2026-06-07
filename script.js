// 1. Mobile Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('open');
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open');
    });
});

const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        document.querySelectorAll('.accordion-item').forEach(acc => {
            acc.classList.remove('active');
        });

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

const testimonials = [
    { name: "Praise J.", type: "Student", text: "I got my JAMB admission letter very quickly. Very fast and reliable service!" },
    { name: "Deborah A.", type: "NYSC", text: "EmmaTest Cybercafe helped me with my NYSC call-up letter without stress. Highly recommend!" },
    { name: "Chinedu K.", type: "Civilian", text: "I always pay my bills and sometimes buy data from here. Super convenient and trustworthy." },
    { name: "Aisha T.", type: "Student", text: "Printed my WAEC results so easily. picked it up near my area. Nice man" },
    { name: "Samuel O.", type: "Freelancer", text: "Excellent typesetting and formatting service. My documents look highly professional." },
    { name: "Grace E.", type: "Student", text: "Got my NIN slip printed and delivered around my school quickly. Excellent customer service." },
    { name: "Tunde B.", type: "Student", text: "Post-UTME registration was seamless. Guided me through every step." },
    { name: "Ngozi M.", type: "NYSC", text: "Green card printed and delivered near to me exactly when promised." },
    { name: "Victor L.", type: "Student", text: "Result printing was quick and they directed me to cafes near me. Very reliable." }
];

let currentIndex = 0;
const container = document.getElementById('testimonial-container');

function renderTestimonials() {
    if(!container) return; 
    container.innerHTML = '';
    const isMobile = window.innerWidth <= 768;
    const cardsToShow = isMobile ? 1 : 3;

    for (let i = 0; i < cardsToShow; i++) {
        const index = (currentIndex + i) % testimonials.length;
        const review = testimonials[index];
        
        const cardHTML = `
            <div class="test-card hover-float">
                <i class="fas fa-quote-left text-green" style="font-size: 2rem;"></i>
                <div class="stars">
                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                </div>
                <p>"${review.text}"</p>
                <div style="margin-top: 15px;">
                    <strong>— ${review.name}</strong><br>
                    <span style="font-size: 0.8rem; color: var(--gray-text);">${review.type}</span>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    }
}

if(document.getElementById('nextTestimonial')){
    document.getElementById('nextTestimonial').addEventListener('click', () => {
        const isMobile = window.innerWidth <= 768;
        currentIndex = (currentIndex + (isMobile ? 1 : 3)) % testimonials.length;
        renderTestimonials();
    });

    document.getElementById('prevTestimonial').addEventListener('click', () => {
        const isMobile = window.innerWidth <= 768;
        const step = isMobile ? 1 : 3;
        currentIndex = (currentIndex - step + testimonials.length) % testimonials.length;
        renderTestimonials();
    });
}

window.addEventListener('resize', renderTestimonials);
renderTestimonials();

const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');
const body = document.body;

const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    themeIcon.classList.replace('fa-moon', 'fa-sun'); 
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});


// --- FORM LOGIC --- //

const serviceCategory = document.getElementById('serviceCategory');
const serviceType = document.getElementById('serviceType');
const form = document.getElementById('serviceForm');

const servicesMap = {
    education: ["WAEC Result Checking", "NECO Result Checking", "JAMB Result Printing", "JAMB Admission Letter", "Post-UTME Registration", "School Applications", "Transcript Assistance", "Course Registration"],
    nysc: ["NYSC Call-Up Letter", "Green Card Printing", "NYSC Portal Assistance", "Relocation Printing", "SAED Registration", "Senate List Checking"],
    document: ["Typing & Formatting", "Photocopying", "Scanning to PDF", "Colored Document Printing", "Passport Printing", "CV/Resume Formatting", "Online Document Submission"],
    identity: ["NIN Slip Printing", "BVN Assistance", "Government Portal Assistance", "TIN Registration Help", "Online Application Assistance"],
    utility: ["Electricity Bills", "Cable TV Subscription", "Airtime Recharge", "Data Bundles", "Betting Wallet Funding", "Internet Subscription"],
    additional: ["Email Creation", "Passport Photo Editing", "Online Registrations", "Exam Registrations", "General Online Assistance", "Other (specify in description)"]
};

if (serviceCategory && serviceType) {
    serviceCategory.addEventListener('change', function() {
        serviceType.innerHTML = '<option value="" disabled selected>Select specific service</option>';
        serviceType.disabled = false;
        
        const selectedServices = servicesMap[this.value];
        if (selectedServices) {
            selectedServices.forEach(type => {
                serviceType.innerHTML += `<option value="${type}">${type}</option>`;
            });
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category');
    
    if (catParam && servicesMap[catParam]) {
        serviceCategory.value = catParam;
        serviceCategory.dispatchEvent(new Event('change')); 
    }
}

const deliveryRadios = document.querySelectorAll('input[name="deliveryType"]');
const locationGroup = document.getElementById('locationGroup');
const meetupLocation = document.getElementById('meetupLocation');

if(deliveryRadios) {
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if(e.target.value === 'Hardcopy Delivery' || e.target.value === 'Both') {
                locationGroup.style.display = 'block';
                meetupLocation.setAttribute('required', 'true');
            } else {
                locationGroup.style.display = 'none';
                meetupLocation.removeAttribute('required');
                meetupLocation.value = ''; 
                meetupLocation.classList.remove('input-error'); 
            }
        });
    });
}

const fileUpload = document.getElementById('fileUpload');
const fileNameDisplay = document.getElementById('fileNameDisplay');
if(fileUpload && fileNameDisplay) {
    fileUpload.addEventListener('change', function() {
        let fileNames = [];
        for (let i = 0; i < this.files.length; i++) {
            fileNames.push(this.files[i].name);
        }
        fileNameDisplay.textContent = fileNames.length > 0 ? "Attached: " + fileNames.join(', ') : "";
    });
}

if(form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault(); 
        
        let isValid = true;
        
        document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
        
        const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('input-error');
            }
        });

        const contactCheckboxes = form.querySelectorAll('input[name="contactMethod"]');
        const isContactChecked = Array.from(contactCheckboxes).some(cb => cb.checked);
        const contactGroup = document.getElementById('contactGroup');
        
        if (!isContactChecked) {
            isValid = false;
            contactGroup.classList.add('input-error');
            contactGroup.style.padding = "10px";
            contactGroup.style.borderRadius = "8px";
        } else {
            contactGroup.classList.remove('input-error');
            contactGroup.style.padding = "0";
        }
        
        if (!isValid) {
            alert('Please fill out all required fields marked with a red star (*).');
            return;
        }

        const name = document.getElementById('fullName').value;
        const phone = document.getElementById('phoneNumber').value;
        const email = document.getElementById('emailAdd').value || 'Not provided';
        
        const catSelect = document.getElementById('serviceCategory');
        const catText = catSelect.options[catSelect.selectedIndex].text;
        const typeText = document.getElementById('serviceType').value;
        const desc = document.getElementById('requestDesc').value;
        
        const deliveryType = document.querySelector('input[name="deliveryType"]:checked').value;
        const locationVal = document.getElementById('meetupLocation').value || 'N/A';
        
        const selectedContacts = Array.from(contactCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value)
            .join(', ');

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading Files...';
        submitBtn.disabled = true;

        try {
            let filesText = 'None';
            
            if(fileUpload.files.length > 0) {
                const filesArray = Array.from(fileUpload.files);
                
                const cloudName = "dknq8iwm0"; 
                const uploadPreset = "pbykkjv5";
                
                const uploadPromises = filesArray.map(async (file) => {
                    const fd = new FormData();
                    fd.append('file', file);
                    fd.append('upload_preset', uploadPreset);

                    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
                        method: 'POST',
                        body: fd
                    });
                    
                    const data = await response.json();
                    
                    if(data.secure_url) {
                        return `- ${file.name}:\n  ${data.secure_url}`;
                    } else {
                        throw new Error(data.error.message || "Failed to upload to cloud.");
                    }
                });

                const uploadedLinks = await Promise.all(uploadPromises);
                filesText = uploadedLinks.join('\n\n');
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Request...';
            }

            const messageBody = 
`*NEW CYBERCAFE REQUEST*

*Name:* ${name}
*Phone Number:* ${phone}
*Email Address:* ${email}

*Service Category:* ${catText}
*Service Type:* ${typeText}
*Request Description:* ${desc}

*Uploaded Files:*
${filesText}

*Delivery Type:* ${deliveryType}
*Preferred Location:* ${locationVal}
*Preferred Contact Method:* ${selectedContacts}`;
        
            const businessWhatsAppNumber = '2348055755066'; 
            const waLink = `https://wa.me/${businessWhatsAppNumber}?text=${encodeURIComponent(messageBody)}`;

            const apiFormData = new FormData();
            
            // Web3Forms Access Key
            apiFormData.append("access_key", "991b877b-494f-4021-b5a9-50429b5ab900"); 
            
            apiFormData.append("subject", `New Request: ${typeText} from ${name}`);
            apiFormData.append("from_name", "EmmaTest Cybercafe Alerts");
            apiFormData.append("Name", name);
            apiFormData.append("Phone", phone);
            apiFormData.append("Email", email);
            apiFormData.append("Category", catText);
            apiFormData.append("Service", typeText);
            apiFormData.append("Description", desc);
            apiFormData.append("Attached Files List", filesText);
            apiFormData.append("Delivery Type", deliveryType);
            apiFormData.append("Preferred Location", locationVal);
            apiFormData.append("Contact Method", selectedContacts);

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: apiFormData
            });
            
            const jsonResponse = await response.json(); 

            if (response.status === 200) {
                // Clear the form first
                form.reset();
                if(fileNameDisplay) fileNameDisplay.textContent = "";
                locationGroup.style.display = 'none';
                
                // Redirect current tab to WhatsApp
                window.location.href = waLink;
            } else {
                alert("Email Server Error: " + jsonResponse.message);
            }

        } catch (error) {
            console.error(error);
            alert("Error processing request: " + error.message);
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    form.addEventListener('input', function(e) {
        if(e.target.classList.contains('input-error') && e.target.value.trim() !== '') {
            e.target.classList.remove('input-error');
        }
    });
}