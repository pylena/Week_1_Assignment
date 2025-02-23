import { validateForm } from "../utils/validation.js";
import { FormHandler } from "./form-handler.js";
export class Form {
    constructor() {
        this.form = document.createElement("form");
        this.formHandler = new FormHandler(this.form);

        this.form.innerHTML = `
            <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
                <label class="block text-gray-700 ">نوع المنشأة</label>
                <select class="w-full p-2 border rounded-md">
                    <option>الرجاء الاختيار</option> 
                    <option value="1">شركة</option>
                    <option value="2">مؤسسة</option>
                </select>
            </div>
            <div class="space-y-2">
                <label class="block text-gray-700">رمز التحقق</label>
                <input type="text" class="w-full p-2 border rounded-md">
            </div>
        </div>
    
        <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="space-y-2">
                <label class="block text-gray-700">اسم الشركة</label>
                <input type="text" class="w-full p-2 border rounded-md" id="name">
                <span class="error" id="nameError"></span><br><br>

            </div>
            <div class="space-y-2">
                <label class="block text-gray-700">الرقم الضريبي للمنشأه  </label>
                <input type="text" class="w-full p-2 border rounded-md" id="taxNumber">
                <span class="error" id="taxNumberError"></span><br><br>
            </div>
        </div>
    
        <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="space-y-2">
                <label class="block text-gray-700">البريد الإلكتروني</label>
                <input type="email" class="w-full p-2 border rounded-md" id="email">
                <span class="error" id="emailError"></span><br><br>
            </div>
            <div class="space-y-2">
                <label class="block text-gray-700">رقم الهاتف  </label>
                <input type="tel" class="w-full p-2 border rounded-md" id="phone">
                <span class="error" id="phoneError"></span><br><br>
            </div>
        </div>
    
        <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="space-y-2">
                <label class="block text-gray-700"> الرقم السري</label>
                <input type="password" class="w-full p-2 border rounded-md" id="password">
                <span class="error" id="passwordError"></span><br><br>

            </div>
            <div class="space-y-2">
                <label class="block text-gray-700"> تأكيد الرقم السري </label>
                <input type="password" class="w-full p-2 border rounded-md">

            </div>
        </div>
    
        <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="space-y-2">
                <label class="block text-gray-700">المدينة</label>
                <input type="text" class="w-full p-2 border rounded-md id="city">
            </div>
            <div class="space-y-2">
                <label class="block text-gray-700">الشارع</label>
                <input type="text" class="w-full p-2 border rounded-md id="street">
            </div>
            <div class="space-y-2">
                <label class="block text-gray-700"> الرمز البريدي</label>
                <input type="text" class="w-full p-2 border rounded-md id="zipcode">
                
            </div>
        </div>
    
        <div class="mt-4">
            <label class="flex items-center">
                <input type="checkbox" class="mr-2">
                I agree to the  <a href="#" class="text-blue-600 underline ml-1"> Terms & Conditions</a>
            </label>
        </div>
    <!-- Submit Button -->
     <div class="flex justify-center mt-6">
    <button class="w-50 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700" type="submit">
        إرسال الطلب
    </button>
    </div>
        `;

        this.form.addEventListener("submit", this.handleSubmit.bind(this));
        this.formHandler.populateForm();  
    }

   
    handleSubmit(event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const taxNumber = document.getElementById("taxNumber").value.trim();
        const phone = document.getElementById("phone").value.trim();
        

        const errors = this.validateForm(name, email, password, taxNumber, phone);

        document.getElementById("nameError").textContent = errors.name || "";
        document.getElementById("emailError").textContent = errors.email || "";
        document.getElementById("passwordError").textContent = errors.password || "";
        document.getElementById("taxNumberError").textContent = errors.taxNumber || "";
        document.getElementById("phoneError").textContent = errors.phone || "";

        if (!errors.name && !errors.email && !errors.password, !errors.taxNumber, !errors.phone) {
            alert("Registration successful!");
            localStorage.setItem("user", JSON.stringify({ name, email }));
        }
    }

    validateForm(name, email, password, taxNumber,
        phone) {
        const errors = {};

        if (!name) errors.name = "!اسم الشركة مطلوب";
        if (!email) {
            errors.email = "الإيميل مطلوب!";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.email = "Invalid email format!";
        }
        if (!password || password.length < 6) {
            errors.password = "Password must be at least 6 characters!";
        }
        if (!taxNumber) errors.taxNumber = "!الرقم الضريبي مطلوب";
        if (!phone) errors.phone = "!رقم الهاتف مطلوب";

        return errors;
    }

    render(parent) {
        parent.appendChild(this.form);
    }
}
