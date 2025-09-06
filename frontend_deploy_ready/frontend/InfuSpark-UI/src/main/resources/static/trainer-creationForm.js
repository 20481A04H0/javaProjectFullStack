document.getElementById("trainerForm").addEventListener("submit", function(event) {
   event.preventDefault();
   clearErrors();

   const trainer = {
     name: document.getElementById("name").value,
     email: document.getElementById("email").value,
     phone: document.getElementById("phone").value,
     specialization: document.getElementById("specialization").value,
     experience: document.getElementById("experience").value
   };

   fetch('http://localhost:8080/api/trainer/addTrainer', {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(trainer)
   })
   .then(async (res) => {
     if (res.ok) {
       alert("Trainer added successfully!");
	
       document.getElementById("trainerForm").reset();
	   loadTrainers();
	   
     } else if (res.status === 400) {
       const errorData = await res.json();
       displayErrors(errorData);
     } else {
       alert("Something went wrong!");
     }
   })
   .catch(error => {
     console.error("Error:", error);
     alert("Server error. Try again later.");
   });
 });

 function displayErrors(errors) {
   for (let key in errors) {
     const errorElement = document.getElementById(`${key}-error`);
     if (errorElement) {
       errorElement.textContent = errors[key];
     }
   }
 }

 function clearErrors() {
   const errorSpans = document.querySelectorAll(".error-message");
   errorSpans.forEach(span => span.textContent = "");
 }