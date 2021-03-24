import socket
import json
import engine

IP = "0.0.0.0"
PORT = 5000

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((IP, PORT))

engine.start()

def checkAngle(angle):
    if(angle >= 53 and angle <=130):
        return True
    else:
        return False

def checkSpeed(speed):
    if(speed <= 1 and speed >= 0):
        return True
    else:
        return False

try:
    while True: 
        msg, addr = sock.recvfrom(1024)
        data = json.loads(msg)
        veryfy_angle = "angle" in data
        veryfy_speed = "speed" in data
        if(veryfy_angle):
            veryfy = checkAngle(data["angle"])
            if(veryfy):
                engine.changeAngle(data["angle"])
        elif(veryfy_speed):
            veryfy = checkSpeed(data["speed"])
            if(veryfy):
                engine.changeSpeed(data["speed"])
        else:
            print("No Valid Type")
            
        
except KeyboardInterrupt:
    print("Socket closed")