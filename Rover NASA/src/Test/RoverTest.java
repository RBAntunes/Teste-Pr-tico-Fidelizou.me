package Test;

import Main.Rover;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class RoverTest {

    @Test
    public void roverCreatedWithoutInputStartsAt00N () {
        Rover spot =  new Rover ();
        assertEquals( 0 , spot.getCoordinateX().intValue() );
        assertEquals( 0 , spot.getCoordinateY().intValue() );
        assertEquals( "N" , spot.getDirection() );
    }

    @Test
    public void roverCreatedWithInputStartsAtDesiredLocationAndDirection () {
        Rover spot = new Rover( 1, 2, "S" );
        assertEquals( 1 , spot.getCoordinateX().intValue() );
        assertEquals( 2 , spot.getCoordinateY().intValue() );
        assertEquals( "S" , spot.getDirection() );
    }

    @Test
    public void coordinateXIncreasesWhenMovingEast () {
        Rover spot = new Rover ( 0, 1, "E" );
        spot.moveRover();
        assertEquals( 1, spot.getCoordinateX().intValue() );
    }

    @Test
    public void coordinateXDereasesWhenMovingWest () {
        Rover spot = new Rover ( 2, 1, "W" );
        spot.moveRover();
        assertEquals( 1, spot.getCoordinateX().intValue() );
    }

    @Test
    public void coordinateYIncreasesWhenMovingNorth () {
        Rover spot = new Rover ( 1, 0, "N" );
        spot.moveRover();
        assertEquals( 1, spot.getCoordinateY().intValue() );
    }

    @Test
    public void coordinateYDereasesWhenMovingSouth () {
        Rover spot = new Rover ( 1, 2, "S" );
        spot.moveRover();
        assertEquals( 1, spot.getCoordinateY().intValue() );
    }

    @Test
    public void roverSteersRightFourTimesAndReturnsToOriginalPositionPassingThroughOtherCardinalDirections () {
        Rover spot = new Rover();
        spot.steerRover("R");
        assertEquals( "E", spot.getDirection());
        spot.steerRover("R");
        assertEquals( "S", spot.getDirection());
        spot.steerRover("R");
        assertEquals( "W", spot.getDirection());
        spot.steerRover("R");
        assertEquals( "N", spot.getDirection());
    }

    @Test
    public void roverSteersLeftFourTimesAndReturnsToOriginalPositionPassingThroughOtherCardinalDirections () {
        Rover spot = new Rover();
        spot.steerRover("L");
        assertEquals( "W", spot.getDirection());
        spot.steerRover("L");
        assertEquals( "S", spot.getDirection());
        spot.steerRover("L");
        assertEquals( "E", spot.getDirection());
        spot.steerRover("L");
        assertEquals( "N", spot.getDirection());
    }
}
