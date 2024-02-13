import csv
import sys
from datetime import datetime

REQUIRED_HEADERS = ['BaseDateTime', 'LAT', 'LON', 'IMO']

def is_valid_row(row):
    try:
        datetime.strptime(row['BaseDateTime'], '%Y-%m-%dT%H:%M:%S')

        lat = float(row['LAT'])
        lon = float(row['LON'])
        if not (-90 <= lat <= 90 and -180 <= lon <= 180):
            return False

        if not row['IMO'].startswith('IMO') or not row['IMO'][3:].isdigit():
            return False

    except ValueError:
        return False
    return True

def is_valid_headers(header):
    return all(col in header for col in REQUIRED_HEADERS)

def filter_valid_rows(input_file, output_file):
    with open(input_file, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        header = reader.fieldnames

        if not is_valid_headers(header):
            print("Error: Invalid headers in the input file.")
            sys.exit(1)

        valid_rows = [row for row in reader if is_valid_row(row)]

    with open(output_file, 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=header)
        writer.writeheader()
        writer.writerows(valid_rows)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Error: Not enough args given")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    filter_valid_rows(input_file, output_file)
    print(f"Filtered data written to {output_file}")