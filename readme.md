### Install
    npm i git+https://git.hzberg.com/modules/imgine#1.0.2
    
### Setup
```nuxt.config.js```

    buildModules: [
      'imgine'
    ],
    
```nuxt.config.js```

    imgine: {
        namespace: 'imgine.space',
        
        // Local cache images
        cacheLimit: 60,
        
        // Production endpoint
        endpoint: 'https://imgine.space/c/',
        
        // Production static host
        staticEndpoint: 'https://host.com/'
    },
    
### Usage

    this.$imgine.format(imageUrl, {
        // Format (optional) [jpeg, png, webp, avif], default: favorite format
        f: [String],
        
        // Image width (optional) 
        w: [Number]
        
        // Image height (optional) 
        h: [Number]
        
        // Rotate (optional) 
        r: [Number]
        
        // Blur (optional) 
        b: [Number]
        
        // Quality (optional) 
        q: [Number]
    })
