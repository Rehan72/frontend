import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const ServiceCard = ({ title, description, Icon }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex items-center gap-4">
      <Icon size={32} className="text-blue-600" />
      <CardTitle className="text-xl font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

export default ServiceCard;
