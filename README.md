# 3D Navigation Map

A web-based 3D navigation system for buildings. This interactive application provides both 2D and 3D visualization for indoor navigation, allowing users to search for optimal paths between rooms and facilities across multiple floors.

![Technologies](https://img.shields.io/badge/Built%20With-Three.js%20%7C%20p5.js-brightgreen)


## 🌟 Features

- **###2D Map View**: Traditional 2D floor plan with path visualization
![Alt Text](https://github.com/xAnyax/3D-Navigation-Map/raw/main/pics/mainpage.PNG)
- **A\* Pathfinding**: Intelligent pathfinding algorithm with diagonal movement support
- **Room Search**: Easy-to-use search interface for rooms and facilities (501-610, toilets, elevators, etc.)
![Alt Text](https://github.com/xAnyax/3D-Navigation-Map/raw/main/pics/searchpath.PNG)
![Alt Text](https://github.com/xAnyax/3D-Navigation-Map/raw/main/pics/searchpath2.PNG)
- **Zoom & Pan**: Flexible map controls with zoom in/out and drag-to-pan functionality
![Alt Text](https://github.com/xAnyax/3D-Navigation-Map/raw/main/pics/enlargemap.PNG)

- **Indicator**: Indicate error and reminder
![Alt Text](https://github.com/xAnyax/3D-Navigation-Map/raw/main/pics/infoindicator.PNG)
![Alt Text](https://github.com/xAnyax/3D-Navigation-Map/raw/main/pics/errorindicator.PNG)

- **3D Visualization**: Interactive 3D model of building floors with pointer lock controls for immersive navigation
- **Multi-Floor Navigation**: Seamless navigation between floors with automatic escalator/elevator routing
- **Minimap**: Toggle between full map view and minimap for quick reference
- **Real-time Path Display**: Visual path rendering in both 2D and 3D environments
![Alt Text](https://github.com/xAnyax/3D-Navigation-Map/raw/main/pics/3dpath.PNG)
![Alt Text](https://github.com/xAnyax/3D-Navigation-Map/raw/main/pics/3dpath2.PNG)



## 🛠️ Technologies Used

- **Three.js** (v0.153.0) - 3D WebGL rendering
- **p5.js** (v1.6.0) - 2D canvas graphics and interactive controls
- **GLTF Loader** - Loading 3D building models
- **DRACO Loader** - Compressed 3D model support
- **Pointer Lock API** - First-person camera controls
- **HTML5/CSS3/JavaScript** - Core web technologies

## 📁 Project Structure

```
3D-Navigation-Map-main/
├── main.html                              # Main HTML entry point
├── map.js                                 # 3D scene and camera controls
├── Node.js                                # A* pathfinding node class
├── aStar_diagonal_final_path_only.js     # A* algorithm implementation
├── style.css                              # UI styling
├── map/                                   # 3D models and map images
│   ├── 56_16.0.gltf                       # 3D building model
│   ├── 5floor_done_75.png                 # 5th floor 2D map
│   └── 6Floor_done_75.png                 # 6th floor 2D map
├── pics/                                  # Additional assets
└── Node.js                                # Node class for grid-based pathfinding
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser with WebGL support
- Internet connection (for CDN libraries)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/3D-Navigation-Map.git
   cd 3D-Navigation-Map-main
   ```

2. **Open in browser**
   - Option A: Double-click `main.html` to open directly
   - Option B: Serve with a local server (recommended for best results)
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js http-server
     npx http-server
     ```
   - Then navigate to `http://localhost:8000`

## 📖 Usage

### Basic Navigation

1. **Select Start and End Points**
   - Choose a room or facility from the "From:" dropdown
   - Choose a destination from the "To:" dropdown
   - Available locations: Rooms (501-510, 601-610), Toilets, Elevator, Escalator

2. **Generate Path**
   - Click the "START" button to calculate the optimal path
   - The path will display in both 2D and 3D views

3. **View Modes**
   - **2D Map**: Traditional top-down floor plan view with path overlay
   - **3D Model**: First-person immersive navigation with path visualization

### Controls

#### 2D Map Controls
- **Mouse Drag**: Pan around the map
- **Scroll Wheel**: Zoom in/out
- **Floor Buttons**: Switch between 5th and 6th floor
- **Zoom Buttons**: Precise zoom control (±6 levels)

#### 3D Model Controls
- **Mouse**: Look around (pointer lock)
- **W/↑ Arrow**: Move forward
- **S/↓ Arrow**: Move backward
- **A/← Arrow**: Strafe left
- **D/→ Arrow**: Strafe right
- **Ctrl**: Move up
- **Shift**: Move down
- **ESC**: Exit pointer lock mode

### Switching Between Views

- Click the **map toggle button** (top-right) to switch between 2D map and 3D model
- When in 3D view, click on the canvas to activate first-person controls
- Click the 2D map button to return to the 2D view

## 🧠 Algorithm Details

### A\* Pathfinding

The project implements the A\* (A-Star) algorithm with the following characteristics:

- **Heuristic**: Euclidean distance to target
- **Grid Size**: 57 columns × 93 rows
- **Diagonal Movement**: 8-directional movement (including diagonals)
- **Obstacle Avoidance**: Dynamic obstacle mapping for each floor
- **Cost Function**: f(n) = g(n) + h(n)
  - g(n): Distance from start node
  - h(n): Heuristic distance to end node

### Grid-Based Navigation

Each floor is represented as a grid where:
- **Passable nodes**: Corridors and accessible areas
- **Obstacle nodes**: Walls and restricted areas
- **Special nodes**: Room entrances, escalators, elevators

## 🎨 User Interface

### Sidebar
- **Search Panel**: Room/facility selection with autocomplete
- **Path Display**: Shows current path information
- **Floor Selector**: Quick access to floor-specific maps

### Main Canvas
- **2D View**: Map with path overlay, zoom controls, and navigation buttons
- **3D View**: Immersive 3D environment with real-time path visualization

### Notifications
- **Error Messages**: Invalid room selections or navigation errors
- **Info Messages**: Cross-floor navigation instructions

## 🔍 Features in Detail

### Multi-Floor Navigation

When navigating between floors (5th and 6th):
- Automatic routing through escalators or elevators
- Visual indicators for floor transition points
- Smooth camera repositioning in 3D view

### Minimap

- Toggle-able minimap in the corner of 3D view
- Shows current camera position and path overview
- Useful for orientation in large environments

### Error Handling

- Validates room numbers and facility names
- Prevents navigation to non-existent locations
- Provides helpful error messages for invalid selections

## 📝 File Descriptions

| File | Purpose |
|------|---------|
| `main.html` | Main application entry point with UI structure |
| `map.js` | Three.js scene setup, 3D model loading, camera controls |
| `Node.js` | Node class for grid representation with floor-specific obstacles |
| `aStar_diagonal_final_path_only.js` | A* algorithm implementation and 2D path visualization |
| `style.css` | All UI styling and layout |

## 🏗️ System Architecture

```
┌─────────────────────────────────────┐
│         main.html (UI)              │
├─────────────────────────────────────┤
│  ┌─────────────────┬───────────────┐│
│  │  map.js (3D)    │ p5.js (2D)    ││
│  │  - Rendering    │ - Canvas      ││
│  │  - Controls     │ - Drawing     ││
│  └─────────────────┴───────────────┘│
├─────────────────────────────────────┤
│  aStar_diagonal_final_path_only.js  │
│  - Pathfinding Logic                │
│  - Path Management                  │
├─────────────────────────────────────┤
│  Node.js                            │
│  - Grid Representation              │
│  - Obstacle Mapping                 │
└─────────────────────────────────────┘
```

## 🐛 Known Limitations

- Requires WebGL-capable browser
- Large 3D models may impact performance on lower-end devices
- Cross-browser compatibility tested primarily on Chrome/Firefox
- Mobile device support is limited


## 📋 Future Enhancements

- [ ] Mobile-responsive design
- [ ] Touch gesture controls for 3D navigation
- [ ] Multiple building support
- [ ] Real-time occupancy information
- [ ] Accessibility features (voice navigation)
- [ ] Offline mode support
- [ ] Dark mode theme
- [ ] Performance optimization for large models


## 🙏 Acknowledgments

- Three.js community for excellent 3D graphics library
- p5.js for 2D graphics and interactive features

---

