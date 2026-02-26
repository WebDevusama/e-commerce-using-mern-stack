import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useCart } from "../pages/cart/useCart";

const Index = () => {
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Store</h1>
          <Button asChild variant="outline" className="relative">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to our Store
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover our curated collection of premium products
        </p>
        <Button asChild size="lg">
          <Link to="/cart">
            View Cart ({totalItems} items)
          </Link>
        </Button>
      </main>
    </div>
  );
};

export default Index;
