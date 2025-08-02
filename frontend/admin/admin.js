document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("uploadForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value.trim();
    const price = document.getElementById("price").value.trim();
    const description = document.getElementById("description").value.trim();
    const sizes = Array.from(document.querySelectorAll("input[name='size']:checked")).map(i => i.value);
    const imageInput = document.getElementById("image");

    // Validate form
    if (!name || !category || !price || !description || sizes.length === 0 || imageInput.files.length === 0) {
      alert("❗ Please fill all fields, including size and image.");
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("sizes", sizes.join(",")); // Send as comma-separated string
    formData.append("image", imageInput.files[0]);

    try {
      const response = await fetch("http://localhost:5000/api/product/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Product uploaded successfully!");
        form.reset();
      } else {
        alert(`❌ Upload failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("❌ Upload error:", error);
      alert("❌ Failed to upload product. Check console for details.");
    }
  });
});
