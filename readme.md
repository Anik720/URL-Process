## Data Structure: 
We use a simple object (urlDatabase) to store the mapping between short URLs and long URLs. This allows for O(1) average time complexity for both insert and lookup operations.

## Generating Short URLs:
 We generate a random string of 6 characters using the generateRandomString function. We ensure the uniqueness of the short URL by checking if it already exists in the urlDatabase.

## URL Validation: 
The isValidURL function uses a regular expression to validate the URL format. This ensures that the input is a proper URL without relying on external packages.