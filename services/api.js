export async function fetchUserData(userId = 1) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        
        return {
            name: data.name || "N/A",
            email: data.email || "N/A",
            phone: data.phone || "N/A",
            
            city: data.address.city || "N/A",
            street: data.street || "N/A",
            zipcode: data.zipcode || "N/A"
            

        };
    } catch (error) {
        console.error("Error loading user data:", error);
        return null; // Return null if fetching fails
    }
}
