document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const loginModal = document.getElementById('loginModal');
    const appContainer = document.getElementById('appContainer');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const emailForm = document.getElementById('emailForm');
    const recipientType = document.getElementById('recipientType');
    const singleRecipientGroup = document.getElementById('singleRecipientGroup');
    const multipleRecipientsGroup = document.getElementById('multipleRecipientsGroup');
    
    // set textarea placeholder
    document.getElementById('recipientEmails').placeholder = "recipient1@example.com\nrecipient2@example.com\n...\n..."

    // check auth info 
    function checkLogin() {
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        
        if (savedEmail && savedPassword) {
            // hide login interface and show app interface 
            loginModal.style.display = 'none';
            appContainer.style.display = 'block';
            
            // set email from saved email
            document.getElementById('senderEmail').value = savedEmail;
        } else {
            // show login interface
            loginModal.style.display = 'flex';
            appContainer.style.display = 'none';
        }
    }

    // change recipient field width 
    recipientType.addEventListener('change', function() {
        if (this.value === 'single') {
            singleRecipientGroup.style.display = 'block';
            multipleRecipientsGroup.style.display = 'none';
        } else {
            singleRecipientGroup.style.display = 'none';
            multipleRecipientsGroup.style.display = 'block';
        }
    });

    function detectService(email) {
      const domain = email.split('@')[1]?.toLowerCase();

      if (!domain) return null;

      if (domain === 'gmail.com') return 'gmail';

      if (
        domain === 'outlook.com' ||
        domain === 'hotmail.com' ||
        domain === 'live.com'
      ) return 'hotmail';

      if (domain === 'yahoo.com' || domain === 'ymail.com' || domain === 'rocketmail.com')
        return 'yahoo';

      if (domain === 'icloud.com' || domain === 'me.com' || domain === 'mac.com')
        return 'icloud';

      if (domain === 'zoho.com') return 'zoho';

      if (domain === 'mail.ru') return 'mail.ru';

      if (domain === 'office365.com' || domain === 'outlook.office365.com')
        return 'outlook365';
      
       alert("خطأ: لم يتم التعرف على مزود الايميل");
       return false;
    }

    // login form
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const service = detectService(email);
        if (service === false) return;
        // save login data in local
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('service', service);
        
        // Hide login window and show app
        loginModal.style.display = 'none';
        appContainer.style.display = 'block';
        
        // Set email in the sender field
        document.getElementById('senderEmail').value = email;
    });

    // log out
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('service');
        checkLogin();
    });

    // send mail
    emailForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const senderName = document.getElementById('senderName').value;
        const senderEmail = document.getElementById('senderEmail').value;
        const isMultipleRecipients = recipientType.value === 'multiple';
        const recipients = isMultipleRecipients 
            ? document.getElementById('recipientEmails').value.split('\n').filter(email => email.trim() !== '')
            : document.getElementById('recipientEmail').value;
        const subject = document.getElementById('emailSubject').value;
        const content = document.getElementById('emailContent').value;
        const isHtml = document.getElementById('emailType').value === 'html';
        
        // Create a data object to send
        const emailData = {
            senderName,
            senderEmail,
            recipients,
            subject,
            content,
            isHtml,
            appPassword: localStorage.getItem('password'),
            service: localStorage.getItem('service')
        };
        
        try {
            // Send data to background
            const response = await fetch('https://sendemail-tool.hsynghdban4.replit.dev/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                alert('تم إرسال البريد بنجاح!');
                emailForm.reset();
                document.getElementById('senderEmail').value = localStorage.getItem('email');
            } else {
                alert(`خطأ في الإرسال: ${result.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ أثناء محاولة إرسال البريد. يرجى المحاولة مرة أخرى.');
        }
    });

    // Check login status when page loads
    checkLogin();
});
