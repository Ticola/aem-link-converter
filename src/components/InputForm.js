import React, { useState } from 'react';

const InputForm = () => {

  const [url, setUrl] = useState('');

  const convertUrl = (inputUrl) => {
    try {
      const parser = new URL(inputUrl);
  
      // Define the conversion mapping for the hostname
      const hostMap = {
        'www': 'https://aem-author.whirlpool.com',
        'cstage': 'https://stage-aem-author.whirlpool.com',
        'cqa': 'https://qa-aem-author.whirlpool.com',
        'cdev': 'https://dev-aem-author.whirlpool.com',
        'cdev2': 'https://perf1-aem-author.whirlpool.com'
      };
  
      // Define the brand mapping for the pathname
      const brandMap = {
        'whirlpool': 'whirlpoolv2/en_us',
        'maytag': 'maytagv2/en_us',
        'kitchenaid': 'kitchenaid/en_us',
        'amana': 'amanav2/en_us',
        'insidepass': 'insidepass/en_us',
        'everydrop': 'everydropv2/en_us',
        'jennair': 'jennair/en_us',
        'swash': 'swash/en_us'
      };
  
      // Extract the subdomain and domain
      const subdomain = parser.hostname.split('.')[0];
      const domain = parser.hostname.split('.')[1];
  
      let brandPath = '';
      // Determine the brandPath based on the domain
      for (const brand of Object.keys(brandMap)) {
        if (domain.includes(brand)) {
          brandPath = brandMap[brand];
          break;
        }
      }
  
      if (!brandPath) throw new Error('Brand not recognized.');
  
      // Convert the URL based on the host map and brand path
      let newUrl = '';
      if (hostMap[subdomain]) {
        newUrl = `${hostMap[subdomain]}/editor.html/content/${brandPath}${parser.pathname}`;
      } else {
        // If the subdomain is not in the hostMap, return the original URL or an error message
        throw new Error('URL does not match expected patterns for conversion.');
      }
  
      return newUrl;
    } catch (error) {
      console.error(error.message);
      // Return null or an indication that the URL conversion failed
      return null;
    }
  };
  
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const authorUrl = convertUrl(url);
    if (authorUrl) {
      window.open(authorUrl, '_blank');
    } else {
      alert('Please enter a valid URL');
    }
  }
  
  return (
    <form className="flex justify-center mb-10" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-input px-4 py-2 w-1/2 rounded-l-md outline-none border-none"
        placeholder="Enter a URL to convert"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        type="submit"
        className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-r-md"
      >
        Convert
      </button>
    </form>
  );
};


export default InputForm;
