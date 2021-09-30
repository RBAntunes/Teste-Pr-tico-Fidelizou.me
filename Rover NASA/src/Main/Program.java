package Main;

import java.util.Scanner;

public class Program {
    private Scanner sc = new Scanner(System.in);
    private Integer sizeX;
    private Integer sizeY;
    private Rover spot = new Rover();
    boolean stop = false;

    public void start() {
        System.out.println("Input desired size of grid ( X Y )");
        this.sizeX = sc.nextInt();
        this.sizeY = sc.nextInt();
        while ( !stop ) {
            this.printRoverStatus(spot);
            String movementInput = sc.next();
            this.treatMovementInput( movementInput );
        }
    }

    public void treatMovementInput ( String movementInput ) {
        String[] inputSequence = movementInput.split("");
        if ( !isSequenceValid( inputSequence ) ) {
            System.out.println("Invalid input sequence. Please use only the characters L, R or M, without spaces");
        } else {
            this.moveRover( inputSequence );
        }
        return;
    }

    public void moveRover( String[] inputSequence ) {
        Rover startingPosition = new Rover(spot.getCoordinateX(), spot.getCoordinateY(), spot.getDirection());
        boolean isValidMovementSequence = true;
        for ( String input : inputSequence ) {
            if ( input.equals("M") ) {
                spot.moveRover();
                if ( this.isRoverOutOfBounds( spot ) ) {
                    System.out.println("Invalid input sequence. The rover cannot go outside the grid, please check the movement sequence.");
                    isValidMovementSequence = false;
                }
            } else {
                spot.steerRover( input );
            }
        }
        if ( !isValidMovementSequence ) {
            spot = startingPosition;
        }
        return;
    }

    public boolean isSequenceValid ( String[] inputSequence ) {
        for ( String input : inputSequence ) {
            if ( !(input.contains("L") || input.contains("R") || input.contains("M") ) ) {
                return false;
            }
        }
        return true;
    }

    public boolean isRoverOutOfBounds ( Rover rover ) {
        if ( rover.getCoordinateX() > sizeX || rover.getCoordinateY() > sizeY || rover.getCoordinateX() < 0 || rover.getCoordinateY() < 0 ) { return true; }
        return false;
    }

    public void printRoverStatus (Rover rover) {
        System.out.println( rover.getCoordinateX() + " " + rover.getCoordinateY() + " " + rover.getDirection());
    }
}
