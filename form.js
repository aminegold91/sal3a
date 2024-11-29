document.getElementById("data-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // الحصول على القيم من الحقول
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    // let fil = document.getElementById("#fil");
    // fil.addEventListener('change',()=>{
    //   const fr = new FileReader();
    //   fr.readAsDataURL(fil.files[0]);
    //   fr.addEventListener('load' ,()=>{
    //     const url = fr.result; 
    //     console.log(url);
    //   })
     
  
   

     
  
    // إنشاء كائن جديد للبيانات
    const newProduct = { name, price: Number(price), description };
  
    // إرسال البيانات إلى الخادم باستخدام fetch
    fetch("http://localhost:4000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save data");
        }
        return response.text();
      })
      .then((message) => {
        document.getElementById("status").innerText = message;
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("status").innerText =
          "حدث خطأ أثناء حفظ البيانات.";
      });
  });