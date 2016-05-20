import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class Final here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class Outerspace extends World
{

    /**
     * Constructor for objects of class Final.
     * 
     */
    public Outerspace()
    {    
        // Create a new world with 600x400 cells with a cell size of 1x1 pixels.
        super(600, 400, 1); 
        
        Ship ship = new Ship();
        addObject(ship, getWidth()/2, getHeight()/2);
        populateRock();
        makeBadguy();
        populateEscapepod();
        Explode.initializeImages();
    }
    
     public void populateRock()
    {
        for ( int i = 1; i <= 6; i++)
        {
            addObject (new Rock(),
                   Greenfoot.getRandomNumber (getWidth()),
                   Greenfoot.getRandomNumber (getHeight()));
                   
      
        }  
    
    }  
   
    public void populateEscapepod()
    {
        for ( int i = 1; i <= 10; i++)
        {
            addObject (new Escapepod(),
                   Greenfoot.getRandomNumber (getWidth()),
                   Greenfoot.getRandomNumber (getHeight()));
                   
      
        }  
    
    }  
    
    /**
     * Create 5 Badguy objects.
     */
    private void makeBadguy()
    {
        int i = 0;
        while (i < 5)
        {
            addObject (new Badguy() ,getWidth()/5 +i*90
            , 40);
            i = i + 1;
            
        }

    }
  
    
    


}
