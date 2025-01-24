from dotenv import load_dotenv
from mira_sdk import MiraClient, Flow
from mira_sdk.exceptions import FlowError
import os
import glob

load_dotenv()
client = MiraClient(config={"API_KEY": os.getenv("MIRA_API_KEY")})

def deploy_flows():
    # Get all YAML files in the flows directory
    flow_files = glob.glob("flows/*.yaml")
    deployed_flows = []

    for flow_file in flow_files:
        try:
            # Create flow from YAML file
            flow = Flow(source=flow_file)
            
            # Deploy to platform
            response = client.flow.deploy(flow)
            
            # Get flow ID from deployment response
            flow_name = os.path.splitext(os.path.basename(flow_file))[0]
            flow_id = f"hellovoid/{flow_name}"
            print(f"Flow deployed successfully with ID: {flow_id}")
            print(f"Flow details: {response}")  # Add this line for debugging
            deployed_flows.append(flow_id)

        except FlowError as e:
            print(f"Error deploying flow {flow_file}: {str(e)}")
        except Exception as e:
            print(f"Unexpected error with {flow_file}: {str(e)}")
    
    return deployed_flows[0] if deployed_flows else None

def test_flow(flow_id, inputs):
    try:
        print(f"Attempting to execute flow with ID: {flow_id}")
        print(f"Input parameters: {inputs}")
        
        # Execute the flow with inputs
        result = client.flow.execute(flow_id, inputs)
        return result
    except Exception as e:
        print(f"Error running flow: {str(e)}")
        return None

def main():
    # Use existing flow ID with correct name from YAML
    flow_id = "hellovoid/travel-planner"
    print(f"\nTesting flow: {flow_id}")
    
    travel_inputs = {
        "destination_preferences": "Historical European cities with focus on art and culture",
        "travel_dates": "10 days in June 2025",
        "budget": "$4000 excluding flights",
        "interests": "Art museums, local cuisine, architecture, photography",
        "travel_style": "Moderate pace, mix of popular sites and local experiences",
        "accommodation_preferences": "Boutique hotels in city centers"
    }
    
    try:
        print(f"Executing flow with inputs: {travel_inputs}")
        result = client.flow.execute(flow_id, travel_inputs)
        if result:
            print("\nTravel Itinerary Generated Successfully!")
            print(result)
        else:
            print("No result returned from flow execution")
    except Exception as e:
        print(f"Error executing flow: {str(e)}")

if __name__ == "__main__":
    main()
