// Quote Sheet Logic
function openQuoteSheet(productName) {
    const overlay = document.getElementById('quoteSheetOverlay');
    const sheet = document.getElementById('quoteSheet');
    const productInput = document.getElementById('quoteProduct');

    if (!productName) {
        const titleEl = document.getElementById('product-title');
        productName = titleEl ? titleEl.innerText : 'General Inquiry';
    }

    productInput.value = productName || 'General Inquiry';

    overlay.classList.remove('hidden');
    setTimeout(() => {
        overlay.style.opacity = '1';
        sheet.style.transform = 'translateY(0)';
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeQuoteSheet() {
    const overlay = document.getElementById('quoteSheetOverlay');
    const sheet = document.getElementById('quoteSheet');

    overlay.style.opacity = '0';
    sheet.style.transform = 'translateY(100%)';
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 500);
    document.body.style.overflow = '';
}

function updateAddressLabel(value) {
    const label = document.getElementById('addressLabel');
    const input = document.getElementById('addressInput');
    if (label && input) {
        if (value === 'Others') {
            label.innerText = 'Business Address';
            input.placeholder = 'Store or Office Location';
        } else {
            label.innerText = `${value} Address`;
            input.placeholder = `${value} address`;
        }
    }
}

function submitQuote(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const message = `*NEW PROJECT QUOTE INQUIRY*\n\n` +
        `*Product:* ${data.product}\n` +
        `*Client Name:* ${data.name}\n` +
        `*Business Type:* ${data.business_type}\n` +
        `*Address:* ${data.address}\n` +
        `*Phone:* ${data.phone}\n` +
        `*Service:* ${data.service}`;

    const phoneNumber = "8801919760626";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    closeQuoteSheet();
    e.target.reset();
}
