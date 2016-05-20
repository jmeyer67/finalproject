import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class Ship here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class Ship extends Mover
{
  
    private GreenfootImage rocket = new GreenfootImage("rocket.png");    
    private GreenfootImage rocketWithThrust = new GreenfootImage("rocketWithThrust.png");
    private int points = 0;

    /**
     * Act - do whatever the Ship wants to do. This method is called whenever
     * the 'Act' or 'Run' button gets pressed in the environment.
     */
    public void act() 
    {

        move(3);
        checkKeys();
        tryToEat();
        checkCollision();
    }   

    /**
     * Check whether there are any key pressed and react to them.
     */
    private void checkKeys() 
    {
        ignite(Greenfoot.isKeyDown("up"));

        if(Greenfoot.isKeyDown("left")) {
            setRotation(getRotation() - 5);
        }        
        if(Greenfoot.isKeyDown("right")) {
            setRotation(getRotation() + 5);
        }
        if(Greenfoot.isKeyDown("up")) {
            move(4);
        }        

    }

    /**
     * Should the rocket be ignited?
     */
    private void ignite(boolean boosterOn) 
    {
        if(boosterOn) {
            setImage(rocketWithThrust);

        }
        else {
            setImage(rocket);        
        }
    }
    
     /**
     * Check whether we are colliding with an bullet.
     */
    private void checkCollision() 
    {
        Actor a = getOneIntersectingObject(Rock.class);
        if (a != null) 
        {
            Outerspace outerspace = (Outerspace) getWorld();
            outerspace.addObject(new Explode(), getX(), getY());
            outerspace.removeObject(this);
            
        }
    }

    /**
     * Check whether we can see Escapepod. if we can, save them.
     */
    public void tryToEat()
    {
        if(canSee(Escapepod.class))
        {
            eat(Escapepod.class);
            points++;
            Greenfoot.playSound("hooray.wav");
            createEscapepod();


        }
        

        if (points == 15) 
        {

            gameOver();
        }  
    }
    /**
     * We have won the game
     */
    public void gameOver()
    {
        Greenfoot.playSound("fanfare.wav");
        Greenfoot.stop();
    }
    
    /**
     * Create a new Escapepod and insert it at random location.
     */
    private void createEscapepod()
    {
        Escapepod newEscapepod;
        newEscapepod = new Escapepod();
        
        World world;
        world = getWorld();
        
        int worldWidth = world.getWidth();
        int worldHeight = world.getHeight();
        int x = Greenfoot.getRandomNumber(worldWidth);
        int y = Greenfoot.getRandomNumber(worldHeight);
        
        
        world.addObject(newEscapepod, x, y);
    }
    

    
    
   
}
