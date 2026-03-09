import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getLeagueByDomain } from "@/lib/league-data";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const league = await getLeagueByDomain(domain);
  if (!league) return <div>League not found.</div>;

  const actionUrl = `/api/contact`;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold font-zona">Contact</h1>
        <p className="text-sm text-muted-foreground">
          Send a message to the league.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contact Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            action={actionUrl}
            method="POST"
          >
            {/* tenant context */}
            <input type="hidden" name="leagueId" value={league.id} />
            <input type="hidden" name="domain" value={domain} />

            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your name" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="you@email.com" type="email" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" placeholder="Schedule question, registration, etc." required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Write your message..." rows={6} required />
            </div>

            <Button type="submit" className="bg-blue-950">Send</Button>

            <p className="text-xs text-muted-foreground">
              MVP: this posts to a simple API route. Later you can wire it to Resend/SendGrid or Firestore.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
