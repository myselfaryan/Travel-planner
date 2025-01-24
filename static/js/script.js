document.getElementById('travelForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Hide any previous results or errors
    document.getElementById('result').classList.add('hidden');
    document.getElementById('error').classList.add('hidden');
    
    // Show loading indicator
    document.getElementById('loadingIndicator').classList.remove('hidden');
    
    // Collect form data
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value.trim(); // Trim whitespace from inputs
    });
    
    try {
        const response = await fetch('/generate-plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        // Hide loading indicator
        document.getElementById('loadingIndicator').classList.add('hidden');
        
        if (result.success) {
            // Show result
            const resultDiv = document.getElementById('result');
            const resultContent = document.getElementById('resultContent');
            
            let formattedResult = '';
            try {
                // Try to parse the result if it's a string
                let itinerary;
                if (typeof result.result === 'string') {
                    // Handle case where result might be a string containing JSON
                    try {
                        itinerary = JSON.parse(result.result);
                    } catch {
                        // If it's not JSON, check if it's an error message
                        if (result.result.includes("error") || result.result.includes("need")) {
                            throw new Error(result.result);
                        }
                        // If it's just a string, wrap it in a simple object
                        itinerary = {
                            trip_overview: result.result
                        };
                    }
                } else {
                    itinerary = result.result;
                }
                
                // Validate the itinerary object has the expected structure
                if (!itinerary.trip_overview && !itinerary.daily_itinerary) {
                    throw new Error('Invalid itinerary format');
                }
                
                formattedResult = `
                    <div class="space-y-6">
                        <!-- Trip Overview -->
                        <div class="bg-indigo-50 p-4 rounded-lg">
                            <h3 class="text-xl font-bold text-indigo-700 mb-2">Trip Overview</h3>
                            <p class="text-gray-700">${itinerary.trip_overview || 'No overview available'}</p>
                        </div>
                        
                        ${itinerary.daily_itinerary ? `
                        <!-- Daily Itinerary -->
                        <div class="space-y-4">
                            <h3 class="text-xl font-bold text-indigo-700">Daily Itinerary</h3>
                            ${itinerary.daily_itinerary.map(day => `
                                <div class="bg-white p-4 rounded-lg shadow-sm">
                                    <h4 class="text-lg font-semibold text-indigo-600 mb-3">${day.day}</h4>
                                    
                                    <div class="space-y-3">
                                        ${day.activities ? `
                                        <div>
                                            <h5 class="font-medium text-gray-700 mb-2">Activities:</h5>
                                            <ul class="list-disc list-inside space-y-1 text-gray-600">
                                                ${day.activities.map(activity => `
                                                    <li>${activity}</li>
                                                `).join('')}
                                            </ul>
                                        </div>
                                        ` : ''}
                                        
                                        ${day.meals ? `
                                        <div>
                                            <h5 class="font-medium text-gray-700 mb-2">Meals:</h5>
                                            <ul class="list-disc list-inside space-y-1 text-gray-600">
                                                ${day.meals.map(meal => `
                                                    <li>${meal}</li>
                                                `).join('')}
                                            </ul>
                                        </div>
                                        ` : ''}
                                        
                                        ${day.accommodation ? `
                                        <div>
                                            <h5 class="font-medium text-gray-700">Accommodation:</h5>
                                            <p class="text-gray-600">${day.accommodation}</p>
                                        </div>
                                        ` : ''}
                                        
                                        ${day.estimated_costs ? `
                                        <div>
                                            <h5 class="font-medium text-gray-700">Estimated Costs:</h5>
                                            <p class="text-gray-600">${day.estimated_costs}</p>
                                        </div>
                                        ` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        ` : ''}
                        
                        ${itinerary.budget_breakdown ? `
                        <!-- Budget Breakdown -->
                        <div class="bg-white p-4 rounded-lg shadow-sm">
                            <h3 class="text-xl font-bold text-indigo-700 mb-3">Budget Breakdown</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${Object.entries(itinerary.budget_breakdown).map(([key, value]) => `
                                    <div>
                                        <p class="font-medium text-gray-700">${key.charAt(0).toUpperCase() + key.slice(1)}:</p>
                                        <p class="text-gray-600">${value}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}
                        
                        ${itinerary.travel_tips ? `
                        <!-- Travel Tips -->
                        <div class="bg-white p-4 rounded-lg shadow-sm">
                            <h3 class="text-xl font-bold text-indigo-700 mb-3">Travel Tips</h3>
                            <ul class="list-disc list-inside space-y-1 text-gray-600">
                                ${itinerary.travel_tips.map(tip => `
                                    <li>${tip}</li>
                                `).join('')}
                            </ul>
                        </div>
                        ` : ''}
                        
                        ${itinerary.local_customs ? `
                        <!-- Local Customs -->
                        <div class="bg-white p-4 rounded-lg shadow-sm">
                            <h3 class="text-xl font-bold text-indigo-700 mb-3">Local Customs</h3>
                            <ul class="list-disc list-inside space-y-1 text-gray-600">
                                ${itinerary.local_customs.map(custom => `
                                    <li>${custom}</li>
                                `).join('')}
                            </ul>
                        </div>
                        ` : ''}
                    </div>
                `;
            } catch (e) {
                console.error('Error formatting result:', e);
                // If we can't format it nicely, show the raw result in a pre tag
                formattedResult = `
                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                        <p class="text-yellow-700">
                            The AI response wasn't in the expected format. Here's the raw response:
                        </p>
                    </div>
                    <pre class="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg text-sm">${
                        typeof result.result === 'string' 
                            ? result.result 
                            : JSON.stringify(result.result, null, 2)
                    }</pre>`;
            }
            
            resultContent.innerHTML = formattedResult;
            resultDiv.classList.remove('hidden');
            
            // Smooth scroll to result
            resultDiv.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Show error
            const errorDiv = document.getElementById('error');
            errorDiv.textContent = result.error || 'An error occurred while generating your travel plan.';
            errorDiv.classList.remove('hidden');
        }
    } catch (error) {
        // Hide loading indicator and show error
        document.getElementById('loadingIndicator').classList.add('hidden');
        const errorDiv = document.getElementById('error');
        errorDiv.textContent = 'An error occurred while generating your travel plan.';
        errorDiv.classList.remove('hidden');
        console.error('Error:', error);
    }
});
