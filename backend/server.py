import time
import random
import sys

# ANSI escape codes for colors
class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def fake_print(text, color=bcolors.ENDC, delay=0.05, end='\n'):
    """Prints text with a specified color and delay, flushing stdout."""
    sys.stdout.write(f"{color}{text}{bcolors.ENDC}{end}")
    sys.stdout.flush()
    if delay > 0:
        time.sleep(delay)

def progress_bar(current, total, epoch_loss, val_acc):
    """Renders a dynamic progress bar."""
    bar_length = 40
    percent = float(current) / total
    arrow = '=' * int(round(percent * bar_length) - 1) + '>'
    spaces = ' ' * (bar_length - len(arrow))
    
    # \r returns to the start of the line
    sys.stdout.write(
        f"\r Batch {current}/{total}: [{arrow + spaces}] {int(percent * 100)}% "
        f"| Loss: {bcolors.BOLD}{epoch_loss:.4f}{bcolors.ENDC} "
        f"| Val_Acc: {bcolors.BOLD}{val_acc:.4f}{bcolors.ENDC}  "
    )
    sys.stdout.flush()

def run_fake_training():
    """Simulates the entire model training and deployment process."""
    
    fake_print("[INFO] Initializing AI Travel Assistant model...", bcolors.OKBLUE)
    fake_print(f"[INFO] Using {bcolors.BOLD}Gemini 2.0 Flash (Simulated){bcolors.ENDC}{bcolors.OKBLUE} backend.", bcolors.OKBLUE)
    time.sleep(1)
    fake_print("[INFO] Loading dataset 'travel_patterns_v3.csv'...", bcolors.OKBLUE)
    time.sleep(1.5)
    fake_print("[INFO] Dataset loaded: 2,150,322 records.", bcolors.OKBLUE)
    fake_print(f"[WARN] {bcolors.BOLD}CUDA not found.{bcolors.ENDC}{bcolors.WARNING} Running on (simulated) CPU. Performance may be degraded.", bcolors.WARNING, delay=1)
    
    fake_print(f"\n{bcolors.HEADER}{bcolors.BOLD}--- Starting Model Training ---{bcolors.ENDC}", bcolors.HEADER, delay=0.5)

    loss = 0.85
    val_acc = 0.72
    total_batches = 250

    for epoch in range(1, 11):
        fake_print(f"\n{bcolors.BOLD}Starting Epoch {epoch}/10{bcolors.ENDC}", bcolors.HEADER, delay=0.2)
        
        for i in range(total_batches + 1):
            loss -= random.random() * (0.001 / (epoch + 1)) # Loss decreases
            val_acc += random.random() * (0.0005 * (epoch + 1)) # Accuracy increases
            if val_acc > 0.98: val_acc = 0.9812 # Cap accuracy
            
            progress_bar(i, total_batches, loss, val_acc)
            time.sleep(0.02)
        
        fake_print(f"\n[RESULT] Epoch {epoch} complete. Final Validation Accuracy: {bcolors.OKGREEN}{bcolors.BOLD}{val_acc:.4f}{bcolors.ENDC}", bcolors.OKGREEN)
        time.sleep(0.5)

    fake_print(f"\n{bcolors.OKGREEN}{bcolors.BOLD}--- Training Complete ---{bcolors.ENDC}", bcolors.OKGREEN, delay=0.5)
    fake_print("[INFO] Saving model weights to 'travel_model_final.h5'...", bcolors.OKBLUE)
    time.sleep(1)
    fake_print("[INFO] Model saved successfully.", bcolors.OKBLUE)
    
    # The URL "spawn" request
    fake_print(f"\n{bcolors.WARNING}Spawning local server for AI Assistant...{bcolors.ENDC}", bcolors.WARNING, delay=1)
    fake_print(f"{bcolors.BOLD}AI Travel Assistant is now running and available at:{bcolors.ENDC}", bcolors.ENDC, delay=0.5)
    fake_print(f"{bcolors.OKCYAN}{bcolors.BOLD}http://127.0.0.1:8080{bcolors.ENDC}", bcolors.OKCYAN)
    fake_print(f"{bcolors.OKCYAN}{bcolors.BOLD}TensorBoard logs at: http://localhost:6006{bcolors.ENDC}", bcolors.OKCYAN)
    fake_print("\n(Press CTRL+C to stop the server)", bcolors.WARNING, delay=0.1)

    # Keep the script "running" and print fake server logs
    fake_users = ["192.168.1.10", "10.0.0.42", "172.16.31.5", "127.0.0.1", "203.0.113.8"]
    fake_endpoints = ["/api/v1/plan_trip", "/api/v1/recommend", "/static/css/main.css", "/", "/api/v1/check_status"]
    
    try:
        while True:
            # Wait for a random time between 2 and 8 seconds
            time.sleep(random.uniform(2, 8))
            
            # Pick fake data
            user_ip = random.choice(fake_users)
            endpoint = random.choice(fake_endpoints)
            status_code = "200 OK"
            if endpoint == "/api/v1/plan_trip":
                status_code = "201 CREATED"
            elif endpoint == "/static/css/main.css":
                status_code = "304 NOT MODIFIED"
            
            # Print fake log
            log_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
            fake_print(f"[{log_time}] {user_ip} - \"GET {endpoint} HTTP/1.1\" - {bcolors.OKGREEN}{status_code}{bcolors.ENDC}", bcolors.ENDC, delay=0)

    except KeyboardInterrupt:
        fake_print(f"\n\n{bcolors.FAIL}Server shutdown requested...{bcolors.ENDC}", delay=0.1)
        time.sleep(0.5)
        fake_print(f"{bcolors.FAIL}Process terminated.{bcolors.ENDC}", delay=0.1)
        sys.exit(0)

if __name__ == "__main__":
    run_fake_training()

