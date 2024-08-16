export function isValidURL(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export async function isJsonUrl(url: string): Promise<boolean> {
  // Step 1: Check if the string is a valid URL
  if (!isValidURL(url)) {
    return false;
  }

  // Step 2: Check if the URL ends with .json
  if (!url.toLowerCase().endsWith(".json")) {
    return false;
  }

  // Step 3: Attempt to fetch the URL and check if it's a JSON
  try {
    const response = await fetch(url, { method: 'HEAD' }); // We can use 'HEAD' to just get headers
    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error fetching the URL: ${error}`);
    return false;
  }
}

export type DisplayableJSON = {
  displayPropertyName: string;
  compareProperty:any;
};

// Type guard function to check if an object is of type DisplayableJSON
function isDisplayableJSON(obj: any): obj is DisplayableJSON {
  return obj && typeof obj === 'object' && 'displayPropertyName' in obj;
}

export async function processJSONArray<T extends DisplayableJSON>(url: string, propertyToDisplay: string | symbol,propertyToCompare:string) {
  try {
    // Fetch JSON data from the URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();

    // Ensure jsonData is an array
    if (!Array.isArray(jsonData)) {
      throw new Error('The fetched JSON data is not an array');
    }

    // Add the specified property to each object in the JSON array
    const updatedData: T[] = jsonData.map((item: any) => {
      if (typeof item === 'object' && item !== null) {
        // Type assertion to DisplayableJSON
        item['displayPropertyName'] =  item[propertyToDisplay];
        if (propertyToCompare in item) {
          item['compareProperty']=item[propertyToCompare]
        }
        else{
          throw new Error(`${propertyToCompare} is not a valid JSON, because propertyToCompare is undefined`);
        }
        return item as T;
      }

      throw new Error('Invalid item type in JSON array');
    });

    // Verify that all items conform to DisplayableJSON
    if (updatedData.every(isDisplayableJSON)) {
      return updatedData;
    } else {
      throw new Error('Not all items conform to DisplayableJSON');
    }
  } catch (error) {
    console.error('Error fetching and modifying JSON:', error);
    throw error; // Re-throw the error to handle it further up
  }
}
