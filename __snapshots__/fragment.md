# `fragment`

#### `generates a correct HTML tree`

```
<div>
  
            
  <div>
    <p>
      Hey!
    </p>
  </div>
  
        
</div>
```

#### `can handle placeholders`

```
<div>
  
            
  <div>
    
                
    <p>
      foo
    </p>
    
                
    <div>
      bar
    </div>
    
            
  </div>
</div>
```

#### `Generates new DocumentFragments for same input`

```
<div>
  
            
  <div>
    <p>
      Hey!3
    </p>
  </div>
  
        
</div>
```

```
<div>
  
            
  <div>
    <p>
      Hey!3
    </p>
  </div>
  
        
</div>
```

