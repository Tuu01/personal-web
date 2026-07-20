// src/pages/BadmintonQueue.jsx
import React from "react";
import CraftLayout from "./CraftLayout";
import {
  Chapter,
  Prose,
  FullImage,
  TwoUp,
  PullQuote,
  Gallery,
  RelatedProject,
  Reveal,
} from "../components/CaseStudy";

const galleryImages = [
  { src: "/assets/projects/BadmintonQueue/bq1.png", alt: "Home screen and the live session" },
  { src: "/assets/projects/BadmintonQueue/bq2.png", alt: "Courts in play and the live queue" },
  { src: "/assets/projects/BadmintonQueue/bq3.png", alt: "Your rating and the club’s skill bands" },
  { src: "/assets/projects/BadmintonQueue/bq4.png", alt: "The mixing and attendance boards" },
  { src: "/assets/projects/BadmintonQueue/bq5.png", alt: "Check-in and creating a session" },
  { src: "/assets/projects/BadmintonQueue/bq6.png", alt: "Player roster and the organiser hub" },
  { src: "/assets/projects/BadmintonQueue/bq7.png", alt: "Past sessions and match history" },
];

const BadmintonQueue = () => (
  <CraftLayout
    index="P · 05"
    area="Product Design · Full-stack"
    title="A fair game, every Saturday"
    sponsor="Live product, a badminton club of ~30 players"
    tags={["Product Design", "UX Audit", "Algorithm Design", "Next.js"]}
    lead="A match-running app for a Saturday badminton club: it decides who plays next, builds even teams, and settles the argument that used to happen every week."
    heroImage="/assets/projects/BadmintonQueue/bq0.png"
    heroAlt="Badminton Queue: personal page, live session, and home screen"
    meta={{
      role: "Sole designer & developer",
      team: "Solo, built for a real club",
      timeline: "2026",
      tools: "Next.js · TypeScript · Firestore · TrueSkill",
    }}
  >
    {/* 01 Context */}
    <Chapter index="01" title="Twenty-two people, three courts, one argument">
      <Prose>
        <p>
          A club night runs on an informal queue that lives in one person&rsquo;s head. The same four
          friends keep pairing up, newcomers wait twice as long, and somebody sits out three rounds
          and quietly stops coming back.
        </p>
        <p>
          It isn&rsquo;t a scheduling problem, it&rsquo;s a <strong>fairness</strong> problem, and fairness is
          exactly the kind of thing a computer is better at than a tired human at 10&nbsp;PM. The app
          answers three questions all night: who&rsquo;s next, who with, and who&rsquo;s missing out.
        </p>
      </Prose>
    </Chapter>

    {/* 02 Contribution */}
    <Chapter index="02" title="What I owned">
      <Reveal>
        <ul className="font-amiamie font-light text-base md:text-lg leading-[1.7] text-DarkLava/90 max-w-[60ch] space-y-3 list-disc pl-5 marker:text-gold">
          <li>
            Built the entire product from scratch: interface, data model, permissions and the
            matchmaking engine
          </li>
          <li>Designed the fairness algorithm and validated it by simulation before it ever ran a session</li>
          <li>Shipped v1 to a real club, then ran a post-launch audit of all 16 screens</li>
          <li>Redesigned the flow on that evidence and shipped it back to the same users</li>
        </ul>
      </Reveal>
      <Prose>
        <p className="text-SageGray">
          Working solo on a live product meant every decision had a real consequence on Saturday
          night, and real users willing to tell me when it wasn&rsquo;t working.
        </p>
      </Prose>
    </Chapter>

    {/* 03 The problem behind the brief */}
    <Chapter index="03" title="I shipped it. Then they told me they didn’t get it.">
      <Prose>
        <p>
          Version one worked: it ran real sessions, picked fair matches, tracked real ratings. But
          once it was in the club&rsquo;s hands, organisers <em>and</em> players said the same thing:{" "}
          <em>&ldquo;I don&rsquo;t get it.&rdquo;</em> The obvious next move was a visual refresh, and that&rsquo;s where the
          conversation started.
        </p>
        <p>
          I argued against it. A reskin changes how an app looks, not how it guides, and the
          complaint was about not knowing what to do, not about how it looked. So I audited all 16
          screens across the three permission tiers first.
        </p>
        <p>
          The finding was uncomfortable, because I&rsquo;d written it: I&rsquo;d built an <strong>expert tool</strong>.
          Knowing the Saturday routine cold, I&rsquo;d quietly assumed everyone else did too. Nearly every
          complaint traced to four causes: no visible way in, no navigation, system words instead
          of human ones, and silence after an action.
        </p>
      </Prose>
      <FullImage
        src="/assets/projects/BadmintonQueue/bq1.png"
        alt="Home screen and the live session"
        caption="Home and the live session: the two screens almost everyone sees"
      />
    </Chapter>

    <PullQuote
      quote="It wasn’t a looks problem. It was a silence problem."
      role="The app knew the answer and simply didn’t say it"
    />

    {/* 04 Design decisions */}
    <Chapter index="04" title="Four changes that did most of the lifting">
      <Prose>
        <p>
          The single most misleading control was a two-mode switch labelled <em>Assign / Record</em>.
          &ldquo;Record&rdquo; didn&rsquo;t mean record a score; it meant hand-pick the teams, and scores were
          recorded in both modes. It became <em>App picks / Pick myself</em>, with a line explaining
          what each does.
        </p>
        <p>
          The home screen also never told you whether you were actually playing that night. Checking
          people in is a manager action, and nothing on your own screen reflected the result; it
          showed that a session was live, and stopped there. It now states your status either way,
          and names who can add you if you&rsquo;re not in.
        </p>
        <p>
          Two smaller gaps closed with it: the sign-in moved from a footer link nobody found to the
          top-right of every screen, and the mid-week empty state (the app sleeps six days a week)
          became a list of recent sessions instead of a blank screen.
        </p>
      </Prose>
      <TwoUp
        items={[
          {
            src: "/assets/projects/BadmintonQueue/bq5.png",
            alt: "Check-in and creating a session",
            caption: "Organiser: check people in, set a session up",
          },
          {
            src: "/assets/projects/BadmintonQueue/bq7.png",
            alt: "Past sessions and match history",
            caption: "Past sessions: what filled the empty mid-week screen",
          },
        ]}
      />
    </Chapter>

    {/* 05 The engine */}
    <Chapter index="05" title="It scores all 210 possible games, then picks one">
      <Prose>
        <p>
          Eight people waiting means 70 possible foursomes, each splittable three ways. Rather than a
          clever heuristic, the app tries every one and takes the best, in about a third of a
          millisecond.
        </p>
        <p>
          Four things compete: how <strong>even</strong> the match is (weighted highest: a good game beats a
          convenient one), how much it <strong>mixes</strong> people who rarely partner, whether it forms a{" "}
          <strong>proper doubles category</strong>, and whether anyone has been <strong>waiting too long</strong>.
          Past 25 minutes you stop being a preference and become a hard constraint.
        </p>
        <p>
          Ratings use TrueSkill, so a newcomer&rsquo;s result moves them quickly and a known player
          slowly. Adding gender-category matching lifted proper doubles from 37% to 99.8% in
          simulation, without measurably reducing anyone&rsquo;s playing time.
        </p>
        <p>
          Every suggestion arrives with the reason it was chosen: who has never partnered, who
          has waited longest. The organiser has to defend the queue out loud on a Saturday night, so
          the app gives them the sentence to say.
        </p>
      </Prose>
      <FullImage
        src="/assets/projects/BadmintonQueue/bq2.png"
        alt="Courts in play and the live queue with a suggested match"
        caption="A suggested match, and the queue it came from"
      />
      <Reveal>
        <div className="rounded-2xl border border-black/10 bg-primary/40 p-6 md:p-8">
          <div className="text-[11px] uppercase tracking-[0.25em] text-SageGray">
            Decisions I&rsquo;d defend
          </div>
          <ul className="mt-3 space-y-2 font-amiamie font-light text-DarkLava/90 list-disc pl-5 marker:text-gold">
            <li>
              <strong>No public win-rates.</strong> A rival club app ranked everyone by win rate; on a
              handful of games that&rsquo;s noise shown as a public verdict, among friends. Broad bands
              instead, with a private number to chase.
            </li>
            <li>
              <strong>No login.</strong> Roles are codes, scoped by how reversible an action is. The threat
              model is &ldquo;someone tapped the wrong thing&rdquo;, not an attacker.
            </li>
            <li>
              <strong>Pair history never decays.</strong> &ldquo;They&rsquo;ve played together&rdquo; doesn&rsquo;t stop being
              true, and adding decay measurably reduced mixing.
            </li>
          </ul>
        </div>
      </Reveal>
    </Chapter>

    {/* 06 Outcome */}
    <Chapter index="06" title="Shipped, and still running">
      <Prose>
        <p>
          The app runs the club&rsquo;s Saturday sessions. The redesign shipped as roughly twenty small,
          reversible changes (a consistent navigation, plain language throughout, honest states, an
          organiser on-ramp, and player photos for recognition), without touching the matchmaking
          core or the rating maths.
        </p>
      </Prose>
      <Reveal>
        <div className="rounded-2xl border border-black/10 bg-primary/40 p-6 md:p-8">
          <div className="text-[11px] uppercase tracking-[0.25em] text-SageGray">
            Honest limitations
          </div>
          <ul className="mt-3 space-y-2 font-amiamie font-light text-DarkLava/90 list-disc pl-5 marker:text-gold">
            <li>Diagnosis came from a screen-by-screen audit and secondhand feedback, not observed sessions</li>
            <li>Ratings need months of play before they mean much; the app deliberately hides them until then</li>
            <li>One club, one context: nothing here is validated at other clubs</li>
          </ul>
        </div>
      </Reveal>
    </Chapter>

    {/* 07 Gallery */}
    <Chapter index="07" title="Selected screens">
      <Prose>
        <p className="text-SageGray">
          Captured from the running app against a seeded demo club. All names are fictional; real
          members&rsquo; data is never shown.
        </p>
      </Prose>
      <Gallery images={galleryImages} />
    </Chapter>

    <RelatedProject
      to="/P4"
      label="AI Video Platform"
      title="AI-generated video for restaurants"
      text="A user-centred design study with Splento."
      image="/assets/projects/AIPlatform/aip0.png"
      alt="AI video platform"
    />
  </CraftLayout>
);

export default BadmintonQueue;
