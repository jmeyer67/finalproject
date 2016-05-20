import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class Escapepod here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class Escapepod extends Actor
{
    
    public Escapepod()
    {
        GreenfootImage image = getImage();
        image.scale(image.getWidth()- 20, image.getHeight()-20);
        setImage(image);
    }
    /**
     * Act - do whatever the Escapepod wants to do. This method is called whenever
     * the 'Act' or 'Run' button gets pressed in the environment.
     */
    
    
         public void act() 
    {
        move(1); 
        randomTurn();
        turnAtEdge();

    }
     /**
     * Test if we are close to one of the edges of the world. Return true is we are.
     */
    public boolean atWorldEdge()
    {
        if(getX() < 10 || getX() > getWorld().getWidth() - 10)
            return true;
        if(getY() < 10 || getY() > getWorld().getHeight() - 10)
            return true;
        else
            return false;
    }
    
    /**
     * With a 10% probability, turn a bit right or left.
     */
    public void randomTurn()
    {
        if ( Greenfoot.getRandomNumber(100) < 10)
        {
            turn(Greenfoot.getRandomNumber(40)-20);
        } 
    }

    /**
     * If we reach the edge of the world, turn a little bit.
     */
    public void turnAtEdge()
    {
        if ( atWorldEdge ())
        {
            turn(8);
        }
    }// Add your action code here.
    }    

