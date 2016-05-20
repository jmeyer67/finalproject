import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class Badguy here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class Badguy extends Mover
{
    public Badguy()
    {
        GreenfootImage image = getImage();
        image.scale(image.getWidth()- 50, image.getHeight()-20);
        setImage(image);
    }
    
    /**
     * Act - do whatever the Badguy wants to do. This method is called whenever
     * the 'Act' or 'Run' button gets pressed in the environment.
     */

    /**
     * Act - do whatever the lizard wants to do. This method is called whenever
     * the 'Act' or 'Run' button gets pressed in the environment.
     */

    public void tryToCatch (Class clss)
    {
        Actor actor = getOneObjectAtOffset(0,0,clss); 
        if (actor !=null)
        { 
            getWorld (). removeObject (actor);
            Greenfoot.playSound("game-over.wav");
            Greenfoot.stop();
        }
    }

    public boolean atWorldEdge()
    {
        if(getX() < 10 || getX() > getWorld().getWidth() - 10)
            return true;
        if(getY() < 10 || getY() > getWorld().getHeight() - 10)
            return true;
        else
            return false;
    }

    public void act() 
    {
        tryToCatch (  Ship.class   );
        move(2); 

        if ( Greenfoot.getRandomNumber(100) < 10)
        {
            turn(Greenfoot.getRandomNumber(40)-20);
        }
        if (atWorldEdge())
        {
            turn(7);// Add your action code here.
        }    
    }
    

}    

