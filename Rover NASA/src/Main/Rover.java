package Main;

public class Rover {

    private Integer coordinateX;
    private Integer coordinateY;
    private String direction;

    public Rover ( Integer coordinateX, Integer coordinateY, String direction ) {
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.direction = direction;
    }

    public Rover () {
        this.coordinateX = 0;
        this.coordinateY = 0;
        this.direction = "N";
    }

    public void moveRover () {
        switch (direction) {
            case "N":
                coordinateY++;
                break;
            case "E":
                coordinateX++;
                break;
            case "S":
                coordinateY--;
                break;
            case "W":
                coordinateX--;
                break;
        }
    }

    public void steerRover ( String steeringDirection ) { // 0 Steers left, 1 steers right
        switch (direction) {
            case "N":
                if ( steeringDirection.equals("L") ) { this.direction = "W"; }
                if ( steeringDirection.equals("R") ) { this.direction = "E"; }
                break;
            case "E":
                if ( steeringDirection.equals("L") ) { this.direction = "N"; }
                if ( steeringDirection.equals("R") ) { this.direction = "S"; }
                break;
            case "S":
                if ( steeringDirection.equals("L") ) { this.direction = "E"; }
                if ( steeringDirection.equals("R") ) { this.direction = "W"; }
                break;
            case "W":
                if ( steeringDirection.equals("L") ) { this.direction = "S"; }
                if ( steeringDirection.equals("R") ) { this.direction = "N"; }
                break;
        }
    }

    public Integer getCoordinateX() {
        return coordinateX;
    }

    public Integer getCoordinateY() {
        return coordinateY;
    }

    public String getDirection () {
        return this.direction;
    }

}
