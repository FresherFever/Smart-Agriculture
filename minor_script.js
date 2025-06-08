// minor_script.js

// Function to show/hide sections
function showSection(id) {
    const contentBoxes = ['about', 'services', 'contact'];
  
    // Hide all content boxes first
    contentBoxes.forEach(sec => {
      const box = document.getElementById(sec);
      box.style.display = "none";
      box.classList.remove("fade-in");
    });
  
    // Show the selected one if not Home
    if (id !== 'hero') {
      const target = document.getElementById(id);
      target.style.display = "block";
      setTimeout(() => target.classList.add("fade-in"), 10); // trigger animation
    }
  }
  
  // Function to predict crop yield
  async function predictYield() {
    const form = document.getElementById('agricultureForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
  
    // Validate that crop name is provided for yield prediction
    if (!data.crop) {
      alert('Please enter a crop name for yield prediction.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/predict_yield', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        const resultDiv = document.getElementById('result');
        const resultText = document.getElementById('resultText');
        resultText.innerText = `Predicted Yield for ${result.crop}: ${result.predicted_yield} ${result.unit}`;
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth' });
      } else {
        alert(result.error || 'Error predicting yield.');
      }
    } catch (error) {
      alert('Error connecting to the backend: ' + error.message);
    }
  }
  
  // Function to recommend the best crop
  async function recommendCrop() {
    const form = document.getElementById('agricultureForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
  
    // Remove crop field for recommendation (not needed)
    delete data.crop;
  
    try {
      const response = await fetch('http://localhost:5000/recommend_crop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        const resultDiv = document.getElementById('result');
        const resultText = document.getElementById('resultText');
        resultText.innerText = `Recommended Best Crop: ${result.recommended_crop}`;
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth' });
      } else {
        alert(result.error || 'Error recommending crop.');
      }
    } catch (error) {
      alert('Error connecting to the backend: ' + error.message);
    }
  }
  
  // Show agricultural input form when "Get Started" is clicked
  document.getElementById('openLogin').addEventListener('click', () => {
    const form = document.getElementById('formSection');
    form.classList.remove('hidden');
    form.style.display = 'block';
    form.scrollIntoView({ behavior: 'smooth' });
  });