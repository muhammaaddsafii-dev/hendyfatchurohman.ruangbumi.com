import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, MapPin, X, Camera } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Fix Leaflet's default icon issue with Webpack/Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const createClusterCustomIcon = function (cluster: any) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: L.point(40, 40, true),
  });
};

interface Profile {
  id: number;
  name: string;
  bio: string;
  image: string | null;
  instagram: string | null;
  youtube: string | null;
  department: string | null;
}

interface Sketch {
  id: number;
  title: string;
  description: string;
  src: string | null;
  latitude: number | null;
  longitude: number | null;
  date: string | null;
  created_at: string;
  images: { id: number; url: string }[];
}

// Component to handle flying to a location
function FlyToLocation({ coords }: { coords: { lat: number; lng: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo([coords.lat, coords.lng], 14, { duration: 1.2 });
    }
  }, [coords, map]);
  return null;
}

const About = () => {
  const [selectedSketch, setSelectedSketch] = useState<Sketch | null>(null);

  const { data: profile, isLoading: isLoadingProfile, error: errorProfile } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const response = await fetch("https://be-hendy-sketch-278881327745.asia-southeast1.run.app/api/about");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const { data: sketches, isLoading: isLoadingSketches } = useQuery({
    queryKey: ["sketches"],
    queryFn: async () => {
      const response = await fetch("https://be-hendy-sketch-278881327745.asia-southeast1.run.app/api/sketches");
      if (!response.ok) {
        throw new Error("Failed to fetch sketches");
      }
      return response.json() as Promise<Sketch[]>;
    },
  });

  const isLoading = isLoadingProfile || isLoadingSketches;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] dark:bg-zinc-950 font-sans text-gray-900 dark:text-gray-100 flex flex-col justify-between">
        <div className="bg-white dark:bg-zinc-900 shadow-sm border-b border-gray-200 dark:border-zinc-800">
          <Header />
        </div>
        <main className="flex-grow flex items-center justify-center p-20">
          <p>Loading...</p>
        </main>
        <div className="w-full max-w-6xl mx-auto border-t border-gray-200 dark:border-zinc-800">
          <Footer />
        </div>
      </div>
    );
  }

  if (errorProfile) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] dark:bg-zinc-950 font-sans text-gray-900 dark:text-gray-100 flex flex-col justify-between">
        <div className="bg-white dark:bg-zinc-900 shadow-sm border-b border-gray-200 dark:border-zinc-800">
          <Header />
        </div>
        <main className="flex-grow flex items-center justify-center p-20">
          <div className="text-center">
            <p className="text-red-500 mb-2">Error loading profile.</p>
            <p className="text-sm text-gray-500">{errorProfile instanceof Error ? errorProfile.message : "Currently unable to reach the server."}</p>
          </div>
        </main>
        <div className="w-full max-w-6xl mx-auto border-t border-gray-200 dark:border-zinc-800">
          <Footer />
        </div>
      </div>
    );
  }

  // Filter sketches with valid coordinates
  const validSketches = sketches?.filter(s => s.latitude && s.longitude) || [];
  // Default center (e.g., Yogyakarta/Jakarta or first sketch)
  const defaultCenter: [number, number] = validSketches.length > 0
    ? [validSketches[0].latitude!, validSketches[0].longitude!]
    : [-7.7956, 110.3695]; // Yogyakarta

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] dark:bg-zinc-950 font-sans text-gray-900 dark:text-gray-100">
      {/* Navbar - Standard Site Header */}
      <div className="bg-white dark:bg-zinc-900 shadow-sm border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-50">
        <Header />
      </div>

      <main className="flex flex-col items-center pt-10 px-4 pb-20">

        {/* Profile Header Section */}
        <div className="flex flex-col items-center w-full max-w-6xl mb-8">
          <div className="mb-4 relative">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-red-500 to-yellow-500">
              <div className="w-full h-full rounded-full border-2 border-white dark:border-zinc-900 bg-white dark:bg-zinc-900 overflow-hidden">
                <img src={profile?.image || "https://placehold.co/400x400?text=No+Child"} alt={profile?.name || "Hendy Fatchurohman"} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-normal text-gray-800 dark:text-gray-100 mb-1">{profile?.name || "Hendy Fatchurohman"}</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">hendy.fatchurohman@mail.ugm.ac.id</p>
        </div>

        {/* Two Column Layout: Bio/Detail & Map */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Column 1: Bio or Sketch Detail (Takes 1 col on LG) */}
          <div className="lg:col-span-1 order-2 lg:order-1 h-full">
            {!selectedSketch ? (
              // Default State: Bio
              <Card className="h-full border-gray-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100 font-bold">Bio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm whitespace-pre-line text-justify">
                    {profile?.bio || "No biography available."}
                  </div>
                  <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 mt-4">
                    <h3 className="text-sm text-gray-800 dark:text-gray-200 mb-1 font-bold">Department</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {profile?.department || "No department available."}
                    </p>
                  </div>
                  {/* <div className="pt-4 text-xs text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    <p>Click on a map marker to view sketch details.</p>
                  </div> */}
                </CardContent>
              </Card>
            ) : (
              // Selected State: Sketch Detail
              <Card className="h-full border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col bg-white dark:bg-zinc-900">
                <CardHeader className="pb-2 relative space-y-0">
                  <div className="flex items-start justify-between">
                    <Badge variant="outline" className="text-xs font-normal">
                      Sketch Details
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedSketch(null)}
                      className="h-8 w-8 -mr-2 -mt-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardTitle className="mt-3 text-lg font-semibold leading-tight pr-6">
                    {selectedSketch.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-xs mt-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(selectedSketch.date)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto pr-1">
                  {/* Image Carousel or Single Image */}
                  {selectedSketch.images && selectedSketch.images.length > 0 ? (
                    <div className="mb-4 relative group">
                      <Carousel className="w-full">
                        <CarouselContent>
                          {selectedSketch.images.map((img) => (
                            <CarouselItem key={img.id}>
                              <div className="rounded-md overflow-hidden border border-gray-100 dark:border-zinc-800 aspect-video bg-gray-50 dark:bg-zinc-800">
                                <img
                                  src={img.url}
                                  alt={selectedSketch.title}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        {selectedSketch.images.length > 1 && (
                          <>
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <CarouselPrevious className="relative left-0 translate-y-0 h-8 w-8" />
                            </div>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <CarouselNext className="relative right-0 translate-y-0 h-8 w-8" />
                            </div>
                          </>
                        )}
                      </Carousel>
                      <div className="text-xs text-center text-muted-foreground mt-2 flex items-center justify-center gap-1">
                        <Camera className="w-3 h-3" />
                        {selectedSketch.images.length} Image{selectedSketch.images.length > 1 ? 's' : ''}
                      </div>
                    </div>
                  ) : selectedSketch.src ? (
                    <div className="mb-4 rounded-md overflow-hidden border border-gray-100 dark:border-zinc-800 aspect-video bg-gray-50 dark:bg-zinc-800">
                      <img
                        src={selectedSketch.src}
                        alt={selectedSketch.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : null}

                  <div className="text-sm text-gray-600 dark:text-gray-400 text-justify leading-relaxed pr-2">
                    <div
                      className="prose prose-sm prose-gray dark:prose-invert max-w-none [&>p]:mb-4 [&>p:last-child]:mb-0"
                      dangerouslySetInnerHTML={{ __html: selectedSketch.description }}
                    />
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800">
                    <Link to={`/sketch/${selectedSketch.id}`}>
                      <Button className="w-full" size="sm">
                        View Full Page
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Column 2: Map (Takes 2 cols on LG) */}
          <div className="lg:col-span-2 h-[500px] lg:h-[600px] order-1 lg:order-2">
            <Card className="h-full border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden p-0 bg-white dark:bg-zinc-900 border-0 ring-1 ring-gray-200 dark:ring-zinc-800 rounded-xl">
              <CardContent className="p-0 h-full w-full relative z-0">
                <MapContainer
                  center={defaultCenter}
                  zoom={6}
                  scrollWheelZoom={true}
                  style={{ height: "100%", width: "100%" }}
                  zoomControl={true}
                >
                  <TileLayer
                    attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                  />

                  <FlyToLocation coords={selectedSketch ? { lat: selectedSketch.latitude!, lng: selectedSketch.longitude! } : null} />

                  <MarkerClusterGroup
                    chunkedLoading
                    iconCreateFunction={createClusterCustomIcon}
                  >
                    {validSketches.map((sketch) => (
                      <Marker
                        key={sketch.id}
                        position={[sketch.latitude!, sketch.longitude!]}
                        icon={redIcon}
                        eventHandlers={{
                          click: () => {
                            setSelectedSketch(sketch);
                          },
                        }}
                      >
                        <Popup>
                          <div className="font-semibold text-sm">{sketch.title}</div>
                        </Popup>
                      </Marker>
                    ))}
                  </MarkerClusterGroup>
                </MapContainer>
              </CardContent>
            </Card>
          </div>

        </div>

        {/* Footer Section in Body */}
        <div className="w-full max-w-7xl mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800">
          <Footer />
        </div>
      </main>

      <style>{`
        .custom-marker-cluster {
          background-color: rgba(220, 38, 38, 0.9);
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
          border: 4px solid rgba(220, 38, 38, 0.4);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }
        
        .custom-marker-cluster:hover {
          background-color: rgba(220, 38, 38, 1);
          transform: scale(1.1);
          border-color: rgba(220, 38, 38, 0.6);
          z-index: 1000 !important;
        }
      `}</style>
    </div>
  );
};

export default About;