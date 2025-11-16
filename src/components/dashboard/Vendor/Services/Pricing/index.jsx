"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { useSession } from "next-auth/react";

export default function VendorPricing() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPlan, setNewPlan] = useState({
    name: "",
    description: "",
    price: "",
    currency: "USD",
    billingCycle: "monthly",
    features: [""],
    limitations: [""],
  });

  const currencies = ["USD", "EUR", "GBP", "INR", "CAD", "AUD"];
  const billingCycles = ["monthly", "quarterly", "annual"];

  // Fetch pricing plans data
  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/vendor/services?email=${session?.user?.email}`
        );
        const result = await response.json();

        if (response.ok) {
          setPricingPlans(result.data.pricingPlans);
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to fetch pricing plans",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching pricing plans:", error);
        toast({
          title: "Error",
          description: "Failed to fetch pricing plans",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchPricingPlans();
    }
  }, [session]);

  const handleAddFeatureField = (type) => {
    if (editingPlan) {
      if (type === "feature") {
        setEditingPlan({
          ...editingPlan,
          features: [...editingPlan.features, ""],
        });
      } else {
        setEditingPlan({
          ...editingPlan,
          limitations: [...editingPlan.limitations, ""],
        });
      }
    } else {
      if (type === "feature") {
        setNewPlan({
          ...newPlan,
          features: [...newPlan.features, ""],
        });
      } else {
        setNewPlan({
          ...newPlan,
          limitations: [...newPlan.limitations, ""],
        });
      }
    }
  };

  const handleRemoveFeatureField = (type, index) => {
    if (editingPlan) {
      if (type === "feature") {
        const updatedFeatures = editingPlan.features.filter(
          (_, i) => i !== index
        );
        setEditingPlan({
          ...editingPlan,
          features: updatedFeatures,
        });
      } else {
        const updatedLimitations = editingPlan.limitations.filter(
          (_, i) => i !== index
        );
        setEditingPlan({
          ...editingPlan,
          limitations: updatedLimitations,
        });
      }
    } else {
      if (type === "feature") {
        const updatedFeatures = newPlan.features.filter((_, i) => i !== index);
        setNewPlan({
          ...newPlan,
          features: updatedFeatures,
        });
      } else {
        const updatedLimitations = newPlan.limitations.filter(
          (_, i) => i !== index
        );
        setNewPlan({
          ...newPlan,
          limitations: updatedLimitations,
        });
      }
    }
  };

  const handleFeatureChange = (type, index, value) => {
    if (editingPlan) {
      if (type === "feature") {
        const updatedFeatures = [...editingPlan.features];
        updatedFeatures[index] = value;
        setEditingPlan({
          ...editingPlan,
          features: updatedFeatures,
        });
      } else {
        const updatedLimitations = [...editingPlan.limitations];
        updatedLimitations[index] = value;
        setEditingPlan({
          ...editingPlan,
          limitations: updatedLimitations,
        });
      }
    } else {
      if (type === "feature") {
        const updatedFeatures = [...newPlan.features];
        updatedFeatures[index] = value;
        setNewPlan({
          ...newPlan,
          features: updatedFeatures,
        });
      } else {
        const updatedLimitations = [...newPlan.limitations];
        updatedLimitations[index] = value;
        setNewPlan({
          ...newPlan,
          limitations: updatedLimitations,
        });
      }
    }
  };

  const handleAddPlan = async () => {
    if (!newPlan.name || !newPlan.description || !newPlan.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Filter out empty feature fields
    const validFeatures = newPlan.features.filter(
      (feature) => feature.trim() !== ""
    );
    const validLimitations = newPlan.limitations.filter(
      (limitation) => limitation.trim() !== ""
    );

    if (validFeatures.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one feature",
        variant: "destructive",
      });
      return;
    }

    try {
      const plan = {
        ...newPlan,
        features: validFeatures,
        limitations: validLimitations,
        price: parseFloat(newPlan.price),
        popular: false,
        status: "Active",
      };

      const response = await fetch("/api/vendor/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          service: plan,
          type: "pricing",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setPricingPlans([...pricingPlans, result.service]);
        setNewPlan({
          name: "",
          description: "",
          price: "",
          currency: "USD",
          billingCycle: "monthly",
          features: [""],
          limitations: [""],
        });
        setIsModalOpen(false);

        toast({
          title: "Success",
          description: "Pricing plan added successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to add pricing plan",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding plan:", error);
      toast({
        title: "Error",
        description: "Failed to add pricing plan",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePlan = async () => {
    if (!editingPlan.name || !editingPlan.description || !editingPlan.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Filter out empty feature fields
    const validFeatures = editingPlan.features.filter(
      (feature) => feature.trim() !== ""
    );
    const validLimitations = editingPlan.limitations.filter(
      (limitation) => limitation.trim() !== ""
    );

    if (validFeatures.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one feature",
        variant: "destructive",
      });
      return;
    }

    try {
      const updatedPlan = {
        ...editingPlan,
        features: validFeatures,
        limitations: validLimitations,
        price: parseFloat(editingPlan.price),
      };

      const response = await fetch("/api/vendor/services", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          service: updatedPlan,
          type: "pricing",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setPricingPlans(
          pricingPlans.map((plan) =>
            plan.id === editingPlan.id ? result.service : plan
          )
        );
        setEditingPlan(null);

        toast({
          title: "Success",
          description: "Pricing plan updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update pricing plan",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating plan:", error);
      toast({
        title: "Error",
        description: "Failed to update pricing plan",
        variant: "destructive",
      });
    }
  };

  const handleDeletePlan = async (id) => {
    try {
      const response = await fetch(
        `/api/vendor/services?email=${session?.user?.email}&id=${id}&type=pricing`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (response.ok) {
        setPricingPlans(pricingPlans.filter((plan) => plan.id !== id));
        toast({
          title: "Success",
          description: "Pricing plan deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete pricing plan",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
      toast({
        title: "Error",
        description: "Failed to delete pricing plan",
        variant: "destructive",
      });
    }
  };

  const handleStatusToggle = async (id) => {
    try {
      const plan = pricingPlans.find((p) => p.id === id);
      if (!plan) return;

      const updatedPlan = {
        ...plan,
        status: plan.status === "Active" ? "Inactive" : "Active",
      };

      const response = await fetch("/api/vendor/services", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          service: updatedPlan,
          type: "pricing",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setPricingPlans(
          pricingPlans.map((plan) => (plan.id === id ? result.service : plan))
        );
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update plan status",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating plan status:", error);
      toast({
        title: "Error",
        description: "Failed to update plan status",
        variant: "destructive",
      });
    }
  };

  const togglePopular = async (id) => {
    try {
      // Remove popular flag from all plans and set it only for the selected one
      const updatedPlans = pricingPlans.map((plan) => ({
        ...plan,
        popular: plan.id === id ? !plan.popular : false,
      }));

      // Find the plan being updated
      const plan = updatedPlans.find((p) => p.id === id);
      if (!plan) return;

      const response = await fetch("/api/vendor/services", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          service: plan,
          type: "pricing",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setPricingPlans(updatedPlans);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update popular status",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating popular status:", error);
      toast({
        title: "Error",
        description: "Failed to update popular status",
        variant: "destructive",
      });
    }
  };

  const filteredPlans = pricingPlans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-gray-600">Loading pricing plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Pricing Plans
          </h1>
          <p className="text-gray-600 mt-1">
            Set up and manage pricing for your services
          </p>
        </div>
        <Button
          className="bg-teal-600 hover:bg-teal-700"
          onClick={() => {
            setEditingPlan(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Pricing Plan
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search pricing plans..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Plans List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`bg-white shadow-sm border-0 relative ${
              plan.popular ? "ring-2 ring-teal-500" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                POPULAR
              </div>
            )}
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    plan.status
                  )}`}
                >
                  {plan.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 ml-1">
                    /{plan.billingCycle}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {plan.currency} currency
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                <ul className="space-y-1">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations.length > 0 && (
                  <>
                    <h4 className="font-medium text-gray-900 mt-3 mb-2">
                      Limitations:
                    </h4>
                    <ul className="space-y-1">
                      {plan.limitations.map((limitation, index) => (
                        <li
                          key={index}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <XCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusToggle(plan.id)}
                >
                  {plan.status === "Active" ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => togglePopular(plan.id)}
                >
                  {plan.popular ? "Remove Popular" : "Make Popular"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingPlan(plan);
                    setIsModalOpen(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeletePlan(plan.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Plan Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingPlan ? "Edit Pricing Plan" : "Add New Pricing Plan"}
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="planName">Plan Name *</Label>
                  <Input
                    id="planName"
                    value={editingPlan ? editingPlan.name : newPlan.name}
                    onChange={(e) =>
                      editingPlan
                        ? setEditingPlan({
                            ...editingPlan,
                            name: e.target.value,
                          })
                        : setNewPlan({ ...newPlan, name: e.target.value })
                    }
                    placeholder="Enter plan name"
                  />
                </div>
                <div>
                  <Label htmlFor="planDescription">Description *</Label>
                  <Textarea
                    id="planDescription"
                    value={
                      editingPlan
                        ? editingPlan.description
                        : newPlan.description
                    }
                    onChange={(e) =>
                      editingPlan
                        ? setEditingPlan({
                            ...editingPlan,
                            description: e.target.value,
                          })
                        : setNewPlan({
                            ...newPlan,
                            description: e.target.value,
                          })
                    }
                    placeholder="Enter plan description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="planPrice">Price ($) *</Label>
                    <Input
                      id="planPrice"
                      type="number"
                      value={editingPlan ? editingPlan.price : newPlan.price}
                      onChange={(e) =>
                        editingPlan
                          ? setEditingPlan({
                              ...editingPlan,
                              price: e.target.value,
                            })
                          : setNewPlan({ ...newPlan, price: e.target.value })
                      }
                      placeholder="Enter price"
                    />
                  </div>
                  <div>
                    <Label htmlFor="planCurrency">Currency</Label>
                    <Select
                      value={
                        editingPlan ? editingPlan.currency : newPlan.currency
                      }
                      onValueChange={(value) =>
                        editingPlan
                          ? setEditingPlan({ ...editingPlan, currency: value })
                          : setNewPlan({ ...newPlan, currency: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="billingCycle">Billing Cycle</Label>
                    <Select
                      value={
                        editingPlan
                          ? editingPlan.billingCycle
                          : newPlan.billingCycle
                      }
                      onValueChange={(value) =>
                        editingPlan
                          ? setEditingPlan({
                              ...editingPlan,
                              billingCycle: value,
                            })
                          : setNewPlan({ ...newPlan, billingCycle: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select cycle" />
                      </SelectTrigger>
                      <SelectContent>
                        {billingCycles.map((cycle) => (
                          <SelectItem key={cycle} value={cycle}>
                            {cycle}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Features *</Label>
                  <div className="space-y-2 mt-2">
                    {(editingPlan
                      ? editingPlan.features
                      : newPlan.features
                    ).map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) =>
                            handleFeatureChange(
                              "feature",
                              index,
                              e.target.value
                            )
                          }
                          placeholder="Enter feature"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleRemoveFeatureField("feature", index)
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddFeatureField("feature")}
                      className="mt-2"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Limitations</Label>
                  <div className="space-y-2 mt-2">
                    {(editingPlan
                      ? editingPlan.limitations
                      : newPlan.limitations
                    ).map((limitation, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={limitation}
                          onChange={(e) =>
                            handleFeatureChange(
                              "limitation",
                              index,
                              e.target.value
                            )
                          }
                          placeholder="Enter limitation"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleRemoveFeatureField("limitation", index)
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddFeatureField("limitation")}
                      className="mt-2"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Limitation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 pt-0">
              <Button
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingPlan(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={editingPlan ? handleUpdatePlan : handleAddPlan}>
                {editingPlan ? "Update Plan" : "Add Plan"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
