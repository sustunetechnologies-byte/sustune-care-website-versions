import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

class RangeRequestHandler(SimpleHTTPRequestHandler):
    """HTTP 1.1 Range Request Handler for streaming MP4 videos locally without connection resets."""
    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()
        
        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(404, "File not found")
            return None

        fs = os.fstat(f.fileno())
        total_length = fs[6]
        range_header = self.headers.get('Range')

        if not range_header or not range_header.startswith('bytes='):
            self.send_response(200)
            self.send_header("Content-Type", self.guess_type(path))
            self.send_header("Content-Length", str(total_length))
            self.send_header("Accept-Ranges", "bytes")
            self.end_headers()
            return f

        range_val = range_header.split('=')[1].strip()
        parts = range_val.split('-')
        start = int(parts[0]) if parts[0] else 0
        end = int(parts[1]) if len(parts) > 1 and parts[1] else total_length - 1

        if start >= total_length:
            self.send_error(416, "Requested Range Not Satisfiable")
            f.close()
            return None

        end = min(end, total_length - 1)
        content_length = end - start + 1

        self.send_response(206)
        self.send_header("Content-Type", self.guess_type(path))
        self.send_header("Content-Range", f"bytes {start}-{end}/{total_length}")
        self.send_header("Content-Length", str(content_length))
        self.send_header("Accept-Ranges", "bytes")
        self.end_headers()

        f.seek(start)
        return RangeFileWrapper(f, content_length)

class RangeFileWrapper:
    def __init__(self, file_obj, length):
        self.f = file_obj
        self.bytes_remaining = length

    def read(self, size=-1):
        if self.bytes_remaining <= 0:
            return b""
        read_size = self.bytes_remaining if size < 0 else min(size, self.bytes_remaining)
        data = self.f.read(read_size)
        self.bytes_remaining -= len(data)
        return data

    def close(self):
        self.f.close()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    server = HTTPServer(('0.0.0.0', port), RangeRequestHandler)
    print(f"Range-enabled HTTP server running on port {port}...")
    server.serve_forever()
