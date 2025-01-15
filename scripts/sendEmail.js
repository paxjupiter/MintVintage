function sendEmail() {
    // Gather form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('senderEmail').value;
    const message = document.getElementById('message').value;
  
    // Validate inputs
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Send email using SMTP.js
    Email.send({
      SecureToken: "71a66334-3703-4406-8b66-b0cc37bea6ff",
      /*
      Required to use email address I signed up with elastic email
      hardcoded into "to" and "from" for testing purposes. This can 
      be changed to be more dynamic with the paid tier of elastic 
      email. In its present state, gmail's DMARC policy causes it to 
      bounce.
      */
      To: "imovetherocks@gmail.com",
      From: "imovetherocks@gmail.com",
      Subject: `Contact Us Form: ${name}`,
      Body: `
        <h3>New Contact Us Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    }).then(
      (response) => {
        if (response === "OK") {
          alert("Message received - I'll get back to you as soon as I can!");
          document.getElementById("contactForm").reset();
        } else {
          alert("Failed to send email. Please try again.");
        }
      }
    ).catch((error) => {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
    });
  }
  