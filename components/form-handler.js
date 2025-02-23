import { fetchUserData } from "../services/api.js";

export class FormHandler {
    constructor(form) {
        this.form = form;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async populateForm() {
        try {
            await this.delay(2000);

            const company = await fetchUserData();
            
            // Ensure company data is valid before populating form
            if (!company) {
                console.error("No data received from API");
                return;
            }

            // Populate form 
            document.getElementById("name").value = company.name;
            document.getElementById("email").value = company.email;
            document.getElementById("phone").value = company.phone;
            document.getElementById("city").value = company.address.city;
            document.getElementById("street").value = company.address.street;
            document.getElementById("zipcode").value = company.address.zipcode;

            console.log("Form pre-filled successfully!");
        } catch (error) {
            console.error("Error populating form:", error);
        }
    }
}
