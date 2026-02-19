const axios = require('axios');
let FormData;
try {
    FormData = require('form-data');
} catch (e) {
    console.log('form-data module not found. Skipping FormData test.');
}

async function testApi() {
    const BASE_URL = 'https://app.swimwell.co.in/api';
    const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODRkZjk5N2UwY2YxZTM5ZjAyNmQ4OTViZGE2Y2RmMDBkMmIwZTZmMDZjYTg0M2U0OTNhN2Y1OWExOTkwODFjMWY5ZDA5OGY0MDg4MDBhMDYiLCJpYXQiOjE3NzAzNTY0MTMuMzUzNDUsIm5iZiI6MTc3MDM1NjQxMy4zNTM0NzQsImV4cCI6MTgwMTg5MjQxMy4zNTAwNSwic3ViIjoiMTIiLCJzY29wZXMiOltdfQ.C9D1ZKfHneUOaXJBGaykF4sWEtNoPlei3wqSZt59hbswd9tlUERUxi29bPn1dnyu70mDTe2F_lKGum4I2a2Cmi-3swTDYXkLdaTFgEoWcEJYaHEkQr9yMRsDJuEw8PVDwP-e3fSRrGG3hBvuCO1LaAcbHRvkCtogwTTJJc3zMoe9bwz9hgz8hva7ji0pKe_9ZckMhnMjaVefF-5jlqwqcyk7NdCIDo54WnYk19UVwkR1EOT1owYmku8jcNkxUG-znh4loze1OJuz4PzeBapfzrl3lpOiORQB2fPdg4Bb8N4bQl1hZuIzRBm3lwlMiuO8aoDmcw_kp3rUIE1ld66IoKyPvZDTcjLucZtqq2Do5vBaXtiuVhAomHmv2rPCwx8OkL0aLEhk7tuZn37aH-PlamDw7uEFXNd0ml92_oHK9ROexsQQ91kOOlmkAQ7bqKi7xgdnoBcFp5SEpqPjSRt8UaCaF458bX0-jrT83FowcKdaTX-2L-q0j_ONxtZV1ZoY9e41mT4syzget0x2kKhn7VlIb5KS7XFNrX0r67M9LwgCjRQG0xDzH1L4qKP9WnHqFR8zv9zXa7Vh1VDzAcvbzjMO_R5zmPZeSuPksawDFlPMPeLqbnhEVe4acNo0WT64tiB-FUC0uBRHhbYD7ipb2KIdRufOaydNF2IZOhrog8Y';

    // Test 1: Using FormData (like in the app)
    try {
        const formData = new FormData();
        formData.append('type', 'commercial');
        formData.append('size', '22');
        formData.append('finish', 'Vinyl');
        formData.append('budget', '22 Lacs');
        formData.append('timeline', '02/05/2026');

        // Simulating the loop
        formData.append('feature[]', 'Jacuzzi');
        formData.append('feature[]', 'Heating');
        formData.append('feature[]', 'Other');

        console.log('Test 1: Sending FormData...');
        const response = await axios.post(
            `${BASE_URL}/add-new-pool`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    ...formData.getHeaders(), // Important for nodejs form-data
                    Accept: 'application/json',
                },
            }
        );
        console.log('✅ FormData Success:', response.status, response.data);
    } catch (error) {
        console.log('❌ FormData Failed:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', error.response.data);
        }
    }

    // Test 2: Using JSON
    try {
        console.log('\nTest 2: Sending JSON...');
        const jsonData = {
            type: 'commercial',
            size: '22',
            finish: 'Vinyl',
            budget: '22 Lacs',
            timeline: '02/05/2026',
            features: ['Jacuzzi', 'Heating', 'Other'], // or "feature" depends on backend
            feature: ['Jacuzzi', 'Heating', 'Other']
        };

        const response2 = await axios.post(
            `${BASE_URL}/add-new-pool`,
            jsonData,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );
        console.log('✅ JSON Success:', response2.status, response2.data);
    } catch (error) {
        console.log('❌ JSON Failed:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', error.response.data);
        }
    }
}

testApi();
