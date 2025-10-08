import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const team = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Project Lead',
    department: 'Environmental Engineering',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
    bio: 'Leading sustainability initiatives with 15 years of experience in carbon accounting.',
    social: {
      linkedin: '#',
      email: 'sarah.j@iitr.ac.in'
    }
  },
  {
    name: 'Prof. Rajesh Kumar',
    role: 'Technical Advisor',
    department: 'Computer Science',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop',
    bio: 'Expert in data visualization and IoT systems for environmental monitoring.',
    social: {
      linkedin: '#',
      github: '#',
      email: 'r.kumar@iitr.ac.in'
    }
  },
  {
    name: 'Priya Sharma',
    role: 'Lead Developer',
    department: 'Information Technology',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop',
    bio: 'Full-stack developer passionate about building tools for climate action.',
    social: {
      github: '#',
      linkedin: '#',
      email: 'priya.s@iitr.ac.in'
    }
  },
  {
    name: 'Arjun Patel',
    role: 'Data Analyst',
    department: 'Environmental Science',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    bio: 'Specializing in emissions modeling and predictive analytics.',
    social: {
      linkedin: '#',
      email: 'arjun.p@iitr.ac.in'
    }
  },
  {
    name: 'Meera Reddy',
    role: 'UX Designer',
    department: 'Design',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    bio: 'Creating intuitive interfaces that make sustainability data accessible to all.',
    social: {
      linkedin: '#',
      email: 'meera.r@iitr.ac.in'
    }
  },
  {
    name: 'Vikram Singh',
    role: 'Research Assistant',
    department: 'Environmental Engineering',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    bio: 'Conducting field research and validating emission measurement methodologies.',
    social: {
      github: '#',
      email: 'vikram.s@iitr.ac.in'
    }
  }
];

export function Team() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
    >
      <div className="text-center space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold tracking-tight text-white"
        >
          Meet Our Team
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-neutral-400 max-w-2xl mx-auto"
        >
          A multidisciplinary team of researchers, developers, and sustainability experts
          working together to create a greener campus.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="rounded-xl border border-white/10 bg-neutral-900/50 overflow-hidden hover:bg-neutral-900/70 transition-colors"
          >
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url('${member.image}')` }}
            />

            <div className="p-6 space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-emerald-400 mb-1">{member.role}</p>
                <p className="text-xs text-neutral-400">{member.department}</p>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed">
                {member.bio}
              </p>

              <div className="flex items-center gap-3 pt-2">
                {member.social.github && (
                  <a
                    href={member.social.github}
                    className="h-8 w-8 rounded-md bg-neutral-950 border border-white/10 hover:bg-neutral-800 flex items-center justify-center transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4 text-neutral-300" />
                  </a>
                )}
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    className="h-8 w-8 rounded-md bg-neutral-950 border border-white/10 hover:bg-neutral-800 flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4 text-neutral-300" />
                  </a>
                )}
                {member.social.email && (
                  <a
                    href={`mailto:${member.social.email}`}
                    className="h-8 w-8 rounded-md bg-neutral-950 border border-white/10 hover:bg-neutral-800 flex items-center justify-center transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4 text-neutral-300" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="rounded-xl border border-white/10 bg-neutral-900/50 p-8 text-center"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Join Our Team</h3>
        <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
          We're always looking for passionate individuals to contribute to our sustainability mission.
          If you're interested in research, development, or community outreach, we'd love to hear from you.
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white transition-colors">
          <Mail className="h-5 w-5" />
          Get in Touch
        </button>
      </motion.div>
    </motion.div>
  );
}
