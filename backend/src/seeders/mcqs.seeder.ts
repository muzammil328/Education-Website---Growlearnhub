import SubHeading from '../models/subHeading.model';
import Heading from '../models/heading.model';
import Class from '../models/class.model';
import Book from '../models/book.model';
import Chapter from '../models/chapter.model';
import Mcqs from '../models/mcqs.model';
import { slugify } from '@muzammil328/utils';

// chapterName, headingName, subHeadingName must exactly match their seeder names
export const mcqs = [
  // ── Introduction to Biology / What is Biology? ─────────────────────────────
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Introduction to Biology',
    headingName: 'What is Biology?', subHeadingName: '',
    questions: [
      { name: 'Biology is the study of?', options: [{ text: 'Rocks', is_correct: false }, { text: 'Living organisms', is_correct: true }, { text: 'Planets', is_correct: false }, { text: 'Chemicals', is_correct: false }], type: 'multipleChoice' },
      { name: 'The word "Biology" is derived from which language?', options: [{ text: 'Latin', is_correct: false }, { text: 'Greek', is_correct: true }, { text: 'Arabic', is_correct: false }, { text: 'French', is_correct: false }], type: 'multipleChoice' },
      { name: 'Who is known as the father of biology?', options: [{ text: 'Darwin', is_correct: false }, { text: 'Aristotle', is_correct: true }, { text: 'Mendel', is_correct: false }, { text: 'Pasteur', is_correct: false }], type: 'multipleChoice' },
      { name: 'Biology is divided into how many main branches?', options: [{ text: 'One', is_correct: false }, { text: 'Two', is_correct: true }, { text: 'Three', is_correct: false }, { text: 'Four', is_correct: false }], type: 'multipleChoice' },
      { name: 'The two main branches of biology are?', options: [{ text: 'Zoology and Botany', is_correct: true }, { text: 'Physics and Chemistry', is_correct: false }, { text: 'Anatomy and Physiology', is_correct: false }, { text: 'Ecology and Geology', is_correct: false }], type: 'multipleChoice' },
      { name: 'Botany is the study of?', options: [{ text: 'Animals', is_correct: false }, { text: 'Plants', is_correct: true }, { text: 'Fungi', is_correct: false }, { text: 'Bacteria', is_correct: false }], type: 'multipleChoice' },
      { name: 'Zoology is the study of?', options: [{ text: 'Plants', is_correct: false }, { text: 'Animals', is_correct: true }, { text: 'Viruses', is_correct: false }, { text: 'Minerals', is_correct: false }], type: 'multipleChoice' },
      { name: 'The study of life at molecular level is called?', options: [{ text: 'Ecology', is_correct: false }, { text: 'Molecular Biology', is_correct: true }, { text: 'Genetics', is_correct: false }, { text: 'Anatomy', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which science deals with the study of heredity?', options: [{ text: 'Ecology', is_correct: false }, { text: 'Morphology', is_correct: false }, { text: 'Genetics', is_correct: true }, { text: 'Physiology', is_correct: false }], type: 'multipleChoice' },
      { name: 'The study of internal structure of organisms is called?', options: [{ text: 'Morphology', is_correct: false }, { text: 'Anatomy', is_correct: true }, { text: 'Ecology', is_correct: false }, { text: 'Taxonomy', is_correct: false }], type: 'multipleChoice' },
      { name: 'Microbiology deals with the study of?', options: [{ text: 'Large organisms', is_correct: false }, { text: 'Microorganisms', is_correct: true }, { text: 'Planets', is_correct: false }, { text: 'Rocks', is_correct: false }], type: 'multipleChoice' },
      { name: 'The study of functions of living organisms is called?', options: [{ text: 'Anatomy', is_correct: false }, { text: 'Taxonomy', is_correct: false }, { text: 'Physiology', is_correct: true }, { text: 'Morphology', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which of the following is NOT a characteristic of living things?', options: [{ text: 'Growth', is_correct: false }, { text: 'Reproduction', is_correct: false }, { text: 'Combustion', is_correct: true }, { text: 'Respiration', is_correct: false }], type: 'multipleChoice' },
      { name: 'The basic unit of life is the?', options: [{ text: 'Atom', is_correct: false }, { text: 'Cell', is_correct: true }, { text: 'Tissue', is_correct: false }, { text: 'Organ', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which of the following is a living thing?', options: [{ text: 'Water', is_correct: false }, { text: 'Virus', is_correct: false }, { text: 'Fern', is_correct: true }, { text: 'Salt', is_correct: false }], type: 'multipleChoice' },
      { name: 'Biology helps us understand?', options: [{ text: 'Space exploration', is_correct: false }, { text: 'Life processes', is_correct: true }, { text: 'Mathematical equations', is_correct: false }, { text: 'Electrical circuits', is_correct: false }], type: 'multipleChoice' },
      { name: 'The study of external structure of organisms is called?', options: [{ text: 'Anatomy', is_correct: false }, { text: 'Morphology', is_correct: true }, { text: 'Physiology', is_correct: false }, { text: 'Ecology', is_correct: false }], type: 'multipleChoice' },
      { name: 'Ecology is the study of?', options: [{ text: 'Cells', is_correct: false }, { text: 'Organisms and their environment', is_correct: true }, { text: 'Genes', is_correct: false }, { text: 'Fossils', is_correct: false }], type: 'multipleChoice' },
      { name: 'Paleontology is the study of?', options: [{ text: 'Living animals', is_correct: false }, { text: 'Fossils', is_correct: true }, { text: 'Bacteria', is_correct: false }, { text: 'Viruses', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which branch studies the classification of organisms?', options: [{ text: 'Physiology', is_correct: false }, { text: 'Taxonomy', is_correct: true }, { text: 'Anatomy', is_correct: false }, { text: 'Ecology', is_correct: false }], type: 'multipleChoice' },
      { name: 'The study of blood and blood diseases is called?', options: [{ text: 'Cardiology', is_correct: false }, { text: 'Haematology', is_correct: true }, { text: 'Nephrology', is_correct: false }, { text: 'Neurology', is_correct: false }], type: 'multipleChoice' },
      { name: 'The study of diseases is called?', options: [{ text: 'Pathology', is_correct: true }, { text: 'Anatomy', is_correct: false }, { text: 'Genetics', is_correct: false }, { text: 'Ecology', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which of the following is a characteristic of living things?', options: [{ text: 'No response to stimuli', is_correct: false }, { text: 'No growth', is_correct: false }, { text: 'Irritability', is_correct: true }, { text: 'No metabolism', is_correct: false }], type: 'multipleChoice' },
      { name: 'Virology is the study of?', options: [{ text: 'Fungi', is_correct: false }, { text: 'Bacteria', is_correct: false }, { text: 'Viruses', is_correct: true }, { text: 'Protozoa', is_correct: false }], type: 'multipleChoice' },
      { name: 'The study of the heart is called?', options: [{ text: 'Neurology', is_correct: false }, { text: 'Cardiology', is_correct: true }, { text: 'Nephrology', is_correct: false }, { text: 'Dermatology', is_correct: false }], type: 'multipleChoice' },
    ],
  },

  // ── Introduction to Biology / Branches of Biology ──────────────────────────
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Introduction to Biology',
    headingName: 'Branches of Biology', subHeadingName: '',
    questions: [
      { name: 'Entomology is the study of?', options: [{ text: 'Birds', is_correct: false }, { text: 'Insects', is_correct: true }, { text: 'Fish', is_correct: false }, { text: 'Reptiles', is_correct: false }], type: 'multipleChoice' },
      { name: 'Ornithology is the study of?', options: [{ text: 'Insects', is_correct: false }, { text: 'Fish', is_correct: false }, { text: 'Birds', is_correct: true }, { text: 'Mammals', is_correct: false }], type: 'multipleChoice' },
      { name: 'Ichthyology is the study of?', options: [{ text: 'Birds', is_correct: false }, { text: 'Fish', is_correct: true }, { text: 'Amphibians', is_correct: false }, { text: 'Reptiles', is_correct: false }], type: 'multipleChoice' },
      { name: 'Herpetology is the study of?', options: [{ text: 'Fish', is_correct: false }, { text: 'Birds', is_correct: false }, { text: 'Reptiles and Amphibians', is_correct: true }, { text: 'Insects', is_correct: false }], type: 'multipleChoice' },
      { name: 'Mycology is the study of?', options: [{ text: 'Plants', is_correct: false }, { text: 'Fungi', is_correct: true }, { text: 'Bacteria', is_correct: false }, { text: 'Algae', is_correct: false }], type: 'multipleChoice' },
      { name: 'Phycology is the study of?', options: [{ text: 'Fungi', is_correct: false }, { text: 'Algae', is_correct: true }, { text: 'Mosses', is_correct: false }, { text: 'Bacteria', is_correct: false }], type: 'multipleChoice' },
      { name: 'Embryology is the study of?', options: [{ text: 'Genes', is_correct: false }, { text: 'Development of embryo', is_correct: true }, { text: 'Fossils', is_correct: false }, { text: 'Blood', is_correct: false }], type: 'multipleChoice' },
      { name: 'The branch of biology dealing with agriculture is called?', options: [{ text: 'Agronomy', is_correct: true }, { text: 'Ecology', is_correct: false }, { text: 'Morphology', is_correct: false }, { text: 'Taxonomy', is_correct: false }], type: 'multipleChoice' },
      { name: 'Histology is the study of?', options: [{ text: 'Organs', is_correct: false }, { text: 'Cells', is_correct: false }, { text: 'Tissues', is_correct: true }, { text: 'Organisms', is_correct: false }], type: 'multipleChoice' },
      { name: 'Cytology is the study of?', options: [{ text: 'Tissues', is_correct: false }, { text: 'Cells', is_correct: true }, { text: 'Organs', is_correct: false }, { text: 'Systems', is_correct: false }], type: 'multipleChoice' },
      { name: 'Pharmacology deals with?', options: [{ text: 'Diseases', is_correct: false }, { text: 'Drugs and medicines', is_correct: true }, { text: 'Fossils', is_correct: false }, { text: 'Genetics', is_correct: false }], type: 'multipleChoice' },
      { name: 'Immunology is the study of?', options: [{ text: 'Hormones', is_correct: false }, { text: 'Immune system', is_correct: true }, { text: 'Nervous system', is_correct: false }, { text: 'Blood cells', is_correct: false }], type: 'multipleChoice' },
      { name: 'Biotechnology involves use of?', options: [{ text: 'Living organisms for technology', is_correct: true }, { text: 'Machines only', is_correct: false }, { text: 'Chemical reactions only', is_correct: false }, { text: 'Astronomy', is_correct: false }], type: 'multipleChoice' },
      { name: 'Endocrinology is the study of?', options: [{ text: 'Nerves', is_correct: false }, { text: 'Hormones and glands', is_correct: true }, { text: 'Bones', is_correct: false }, { text: 'Muscles', is_correct: false }], type: 'multipleChoice' },
      { name: 'The study of cancer is called?', options: [{ text: 'Oncology', is_correct: true }, { text: 'Cardiology', is_correct: false }, { text: 'Pathology', is_correct: false }, { text: 'Nephrology', is_correct: false }], type: 'multipleChoice' },
      { name: 'Nephrology is the study of?', options: [{ text: 'Heart', is_correct: false }, { text: 'Lungs', is_correct: false }, { text: 'Kidneys', is_correct: true }, { text: 'Liver', is_correct: false }], type: 'multipleChoice' },
      { name: 'Neurology deals with the study of?', options: [{ text: 'Heart', is_correct: false }, { text: 'Nervous system', is_correct: true }, { text: 'Digestive system', is_correct: false }, { text: 'Excretory system', is_correct: false }], type: 'multipleChoice' },
      { name: 'Marine biology is the study of?', options: [{ text: 'Desert organisms', is_correct: false }, { text: 'Ocean organisms', is_correct: true }, { text: 'Forest organisms', is_correct: false }, { text: 'Arctic organisms', is_correct: false }], type: 'multipleChoice' },
      { name: 'The study of heredity and variation is?', options: [{ text: 'Physiology', is_correct: false }, { text: 'Genetics', is_correct: true }, { text: 'Ecology', is_correct: false }, { text: 'Morphology', is_correct: false }], type: 'multipleChoice' },
      { name: 'The study of parasites is called?', options: [{ text: 'Parasitology', is_correct: true }, { text: 'Bacteriology', is_correct: false }, { text: 'Virology', is_correct: false }, { text: 'Mycology', is_correct: false }], type: 'multipleChoice' },
      { name: 'Anthropology is the study of?', options: [{ text: 'Apes', is_correct: false }, { text: 'Humankind', is_correct: true }, { text: 'Animals', is_correct: false }, { text: 'Plants', is_correct: false }], type: 'multipleChoice' },
      { name: 'Taxonomy was first developed by?', options: [{ text: 'Aristotle', is_correct: false }, { text: 'Carolus Linnaeus', is_correct: true }, { text: 'Darwin', is_correct: false }, { text: 'Mendel', is_correct: false }], type: 'multipleChoice' },
      { name: 'Bacteriology is the study of?', options: [{ text: 'Viruses', is_correct: false }, { text: 'Fungi', is_correct: false }, { text: 'Bacteria', is_correct: true }, { text: 'Protozoa', is_correct: false }], type: 'multipleChoice' },
      { name: 'Gerontology is the study of?', options: [{ text: 'Genes', is_correct: false }, { text: 'Ageing', is_correct: true }, { text: 'Growth', is_correct: false }, { text: 'Reproduction', is_correct: false }], type: 'multipleChoice' },
      { name: 'Environmental biology studies?', options: [{ text: 'Fossils', is_correct: false }, { text: 'Interaction of organisms with environment', is_correct: true }, { text: 'Cellular processes', is_correct: false }, { text: 'Molecular structures', is_correct: false }], type: 'multipleChoice' },
    ],
  },

  // ── Biodiversity / Classification of Living Things / Five Kingdom Classification
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Biodiversity',
    headingName: 'Classification of Living Things', subHeadingName: 'Five Kingdom Classification',
    questions: [
      { name: 'Who proposed the Five Kingdom classification?', options: [{ text: 'Linnaeus', is_correct: false }, { text: 'Whittaker', is_correct: true }, { text: 'Darwin', is_correct: false }, { text: 'Aristotle', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which kingdom includes bacteria?', options: [{ text: 'Fungi', is_correct: false }, { text: 'Plantae', is_correct: false }, { text: 'Monera', is_correct: true }, { text: 'Protista', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which kingdom includes Amoeba?', options: [{ text: 'Monera', is_correct: false }, { text: 'Protista', is_correct: true }, { text: 'Fungi', is_correct: false }, { text: 'Animalia', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which kingdom includes mushrooms?', options: [{ text: 'Plantae', is_correct: false }, { text: 'Animalia', is_correct: false }, { text: 'Protista', is_correct: false }, { text: 'Fungi', is_correct: true }], type: 'multipleChoice' },
      { name: 'The Five Kingdoms are Monera, Protista, Fungi, Plantae, and?', options: [{ text: 'Bacteria', is_correct: false }, { text: 'Animalia', is_correct: true }, { text: 'Archaea', is_correct: false }, { text: 'Virus', is_correct: false }], type: 'multipleChoice' },
      { name: 'Organisms in Kingdom Monera are?', options: [{ text: 'Eukaryotic', is_correct: false }, { text: 'Prokaryotic', is_correct: true }, { text: 'Multicellular', is_correct: false }, { text: 'Autotrophic only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Fungi obtain nutrients by?', options: [{ text: 'Photosynthesis', is_correct: false }, { text: 'Absorption', is_correct: true }, { text: 'Ingestion', is_correct: false }, { text: 'Chemosynthesis', is_correct: false }], type: 'multipleChoice' },
      { name: 'Kingdom Plantae organisms are mostly?', options: [{ text: 'Heterotrophic', is_correct: false }, { text: 'Autotrophic', is_correct: true }, { text: 'Saprophytic', is_correct: false }, { text: 'Parasitic', is_correct: false }], type: 'multipleChoice' },
      { name: 'Kingdom Animalia organisms are?', options: [{ text: 'Autotrophic', is_correct: false }, { text: 'Heterotrophic', is_correct: true }, { text: 'Prokaryotic', is_correct: false }, { text: 'Unicellular only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Viruses are NOT included in the five kingdoms because?', options: [{ text: 'They are too small', is_correct: false }, { text: 'They are non-living', is_correct: false }, { text: 'They lack cells', is_correct: true }, { text: 'They are rare', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which kingdom was first established by Linnaeus?', options: [{ text: 'Plantae and Animalia', is_correct: true }, { text: 'Monera and Protista', is_correct: false }, { text: 'Fungi and Plantae', is_correct: false }, { text: 'All five kingdoms', is_correct: false }], type: 'multipleChoice' },
      { name: 'The cell wall in fungi is made of?', options: [{ text: 'Cellulose', is_correct: false }, { text: 'Chitin', is_correct: true }, { text: 'Peptidoglycan', is_correct: false }, { text: 'Lignin', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which kingdom includes algae and protozoa?', options: [{ text: 'Monera', is_correct: false }, { text: 'Fungi', is_correct: false }, { text: 'Protista', is_correct: true }, { text: 'Plantae', is_correct: false }], type: 'multipleChoice' },
      { name: 'Blue-green algae belong to kingdom?', options: [{ text: 'Protista', is_correct: false }, { text: 'Plantae', is_correct: false }, { text: 'Monera', is_correct: true }, { text: 'Fungi', is_correct: false }], type: 'multipleChoice' },
      { name: 'Classification of organisms into groups is called?', options: [{ text: 'Ecology', is_correct: false }, { text: 'Taxonomy', is_correct: true }, { text: 'Morphology', is_correct: false }, { text: 'Physiology', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which kingdom contains the most species?', options: [{ text: 'Plantae', is_correct: false }, { text: 'Fungi', is_correct: false }, { text: 'Animalia', is_correct: true }, { text: 'Monera', is_correct: false }], type: 'multipleChoice' },
      { name: 'Organisms that make their own food are called?', options: [{ text: 'Heterotrophs', is_correct: false }, { text: 'Autotrophs', is_correct: true }, { text: 'Saprophytes', is_correct: false }, { text: 'Parasites', is_correct: false }], type: 'multipleChoice' },
      { name: 'Decomposers belong mainly to which kingdoms?', options: [{ text: 'Monera and Fungi', is_correct: true }, { text: 'Plantae and Animalia', is_correct: false }, { text: 'Protista and Plantae', is_correct: false }, { text: 'Animalia only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which kingdom has members that can be unicellular or multicellular?', options: [{ text: 'Monera', is_correct: false }, { text: 'Protista', is_correct: true }, { text: 'Animalia', is_correct: false }, { text: 'Plantae', is_correct: false }], type: 'multipleChoice' },
      { name: 'Cell wall is absent in organisms of kingdom?', options: [{ text: 'Fungi', is_correct: false }, { text: 'Plantae', is_correct: false }, { text: 'Animalia', is_correct: true }, { text: 'Monera', is_correct: false }], type: 'multipleChoice' },
      { name: 'The five-kingdom classification replaced the older how-many-kingdom system?', options: [{ text: 'One', is_correct: false }, { text: 'Two', is_correct: true }, { text: 'Three', is_correct: false }, { text: 'Four', is_correct: false }], type: 'multipleChoice' },
      { name: 'Paramecium belongs to which kingdom?', options: [{ text: 'Monera', is_correct: false }, { text: 'Protista', is_correct: true }, { text: 'Animalia', is_correct: false }, { text: 'Fungi', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which kingdom includes yeast?', options: [{ text: 'Protista', is_correct: false }, { text: 'Monera', is_correct: false }, { text: 'Fungi', is_correct: true }, { text: 'Plantae', is_correct: false }], type: 'multipleChoice' },
      { name: 'The cell wall of plants is made of?', options: [{ text: 'Chitin', is_correct: false }, { text: 'Peptidoglycan', is_correct: false }, { text: 'Cellulose', is_correct: true }, { text: 'Glycogen', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which feature is unique to Kingdom Monera?', options: [{ text: 'Multicellular body', is_correct: false }, { text: 'No membrane-bound nucleus', is_correct: true }, { text: 'Presence of mitochondria', is_correct: false }, { text: 'Presence of chloroplasts', is_correct: false }], type: 'multipleChoice' },
    ],
  },

  // ── Biodiversity / Classification of Living Things / Binomial Nomenclature System
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Biodiversity',
    headingName: 'Classification of Living Things', subHeadingName: 'Binomial Nomenclature System',
    questions: [
      { name: 'Binomial nomenclature was introduced by?', options: [{ text: 'Darwin', is_correct: false }, { text: 'Carolus Linnaeus', is_correct: true }, { text: 'Mendel', is_correct: false }, { text: 'Pasteur', is_correct: false }], type: 'multipleChoice' },
      { name: 'In binomial nomenclature, each organism is given how many names?', options: [{ text: 'One', is_correct: false }, { text: 'Two', is_correct: true }, { text: 'Three', is_correct: false }, { text: 'Four', is_correct: false }], type: 'multipleChoice' },
      { name: 'The first part of a scientific name represents the?', options: [{ text: 'Species', is_correct: false }, { text: 'Genus', is_correct: true }, { text: 'Family', is_correct: false }, { text: 'Order', is_correct: false }], type: 'multipleChoice' },
      { name: 'The second part of a scientific name represents the?', options: [{ text: 'Genus', is_correct: false }, { text: 'Family', is_correct: false }, { text: 'Species', is_correct: true }, { text: 'Kingdom', is_correct: false }], type: 'multipleChoice' },
      { name: 'The scientific name of humans is?', options: [{ text: 'Homo erectus', is_correct: false }, { text: 'Homo sapiens', is_correct: true }, { text: 'Pan troglodytes', is_correct: false }, { text: 'Homo habilis', is_correct: false }], type: 'multipleChoice' },
      { name: 'Scientific names are written in which language?', options: [{ text: 'English', is_correct: false }, { text: 'Latin', is_correct: true }, { text: 'French', is_correct: false }, { text: 'Greek', is_correct: false }], type: 'multipleChoice' },
      { name: 'The genus name in a scientific name always starts with?', options: [{ text: 'Lowercase letter', is_correct: false }, { text: 'Capital letter', is_correct: true }, { text: 'Number', is_correct: false }, { text: 'Symbol', is_correct: false }], type: 'multipleChoice' },
      { name: 'The species name in a scientific name is written in?', options: [{ text: 'Capital letters', is_correct: false }, { text: 'Lowercase letters', is_correct: true }, { text: 'All caps', is_correct: false }, { text: 'Bold', is_correct: false }], type: 'multipleChoice' },
      { name: 'Scientific names are written in?', options: [{ text: 'Bold', is_correct: false }, { text: 'Italics', is_correct: true }, { text: 'Underlined', is_correct: false }, { text: 'Normal text', is_correct: false }], type: 'multipleChoice' },
      { name: 'The scientific name of mango is?', options: [{ text: 'Mangifera persica', is_correct: false }, { text: 'Mangifera indica', is_correct: true }, { text: 'Indica mangifera', is_correct: false }, { text: 'Mangifera domestica', is_correct: false }], type: 'multipleChoice' },
      { name: 'The advantage of binomial nomenclature is?', options: [{ text: 'Uses local names', is_correct: false }, { text: 'Universal scientific language', is_correct: true }, { text: 'Easy to remember', is_correct: false }, { text: 'Uses numbers', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which book did Linnaeus publish for plant classification?', options: [{ text: 'On the Origin of Species', is_correct: false }, { text: 'Species Plantarum', is_correct: true }, { text: 'Systema Naturae', is_correct: false }, { text: 'Genera Plantarum', is_correct: false }], type: 'multipleChoice' },
      { name: 'The hierarchical levels of classification from largest to smallest are?', options: [{ text: 'Kingdom to Species', is_correct: true }, { text: 'Species to Kingdom', is_correct: false }, { text: 'Family to Genus', is_correct: false }, { text: 'Order to Class', is_correct: false }], type: 'multipleChoice' },
      { name: 'The correct order of taxonomic hierarchy is?', options: [{ text: 'Kingdom, Phylum, Class, Order, Family, Genus, Species', is_correct: true }, { text: 'Species, Genus, Family, Order, Class, Phylum, Kingdom', is_correct: false }, { text: 'Kingdom, Class, Phylum, Order, Family, Genus, Species', is_correct: false }, { text: 'Kingdom, Order, Class, Phylum, Family, Genus, Species', is_correct: false }], type: 'multipleChoice' },
      { name: 'The scientific name of the domestic cat is?', options: [{ text: 'Felis domestica', is_correct: true }, { text: 'Canis domesticus', is_correct: false }, { text: 'Felix catus', is_correct: false }, { text: 'Panthera leo', is_correct: false }], type: 'multipleChoice' },
      { name: 'The scientific name of lion is?', options: [{ text: 'Felis tigris', is_correct: false }, { text: 'Panthera tigris', is_correct: false }, { text: 'Panthera leo', is_correct: true }, { text: 'Leo panthera', is_correct: false }], type: 'multipleChoice' },
      { name: 'The smallest unit of classification is?', options: [{ text: 'Genus', is_correct: false }, { text: 'Family', is_correct: false }, { text: 'Species', is_correct: true }, { text: 'Order', is_correct: false }], type: 'multipleChoice' },
      { name: 'The largest unit of classification is?', options: [{ text: 'Phylum', is_correct: false }, { text: 'Kingdom', is_correct: true }, { text: 'Class', is_correct: false }, { text: 'Order', is_correct: false }], type: 'multipleChoice' },
      { name: 'Members of the same species can?', options: [{ text: 'Never interbreed', is_correct: false }, { text: 'Interbreed and produce fertile offspring', is_correct: true }, { text: 'Interbreed but produce sterile offspring', is_correct: false }, { text: 'Only live in the same habitat', is_correct: false }], type: 'multipleChoice' },
      { name: 'The scientific name of rice is?', options: [{ text: 'Triticum aestivum', is_correct: false }, { text: 'Oryza sativa', is_correct: true }, { text: 'Zea mays', is_correct: false }, { text: 'Hordeum vulgare', is_correct: false }], type: 'multipleChoice' },
      { name: 'The scientific name of wheat is?', options: [{ text: 'Oryza sativa', is_correct: false }, { text: 'Zea mays', is_correct: false }, { text: 'Triticum aestivum', is_correct: true }, { text: 'Solanum tuberosum', is_correct: false }], type: 'multipleChoice' },
      { name: 'The word "taxonomy" was coined by?', options: [{ text: 'Linnaeus', is_correct: false }, { text: 'Candolle', is_correct: true }, { text: 'Darwin', is_correct: false }, { text: 'Mendel', is_correct: false }], type: 'multipleChoice' },
      { name: 'The scientific name of frog is?', options: [{ text: 'Rana temporaria', is_correct: true }, { text: 'Bufo bufo', is_correct: false }, { text: 'Felis catus', is_correct: false }, { text: 'Canis lupus', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which of the following correctly writes a scientific name?', options: [{ text: 'homo sapiens', is_correct: false }, { text: 'Homo Sapiens', is_correct: false }, { text: 'Homo sapiens', is_correct: true }, { text: 'HOMO SAPIENS', is_correct: false }], type: 'multipleChoice' },
      { name: 'Taxonomy helps in?', options: [{ text: 'Identifying and naming organisms', is_correct: true }, { text: 'Curing diseases', is_correct: false }, { text: 'Growing crops', is_correct: false }, { text: 'Predicting weather', is_correct: false }], type: 'multipleChoice' },
    ],
  },

  // ── Cells and Tissues / Cell Structure / Prokaryotic Cells ──────────────────
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Cells and Tissues',
    headingName: 'Cell Structure', subHeadingName: 'Prokaryotic Cells',
    questions: [
      { name: 'What is the basic structural and functional unit of life?', options: [{ text: 'Atom', is_correct: false }, { text: 'Cell', is_correct: true }, { text: 'Tissue', is_correct: false }, { text: 'Organ', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which cells lack a membrane-bound nucleus?', options: [{ text: 'Eukaryotic cells', is_correct: false }, { text: 'Prokaryotic cells', is_correct: true }, { text: 'Plant cells', is_correct: false }, { text: 'Animal cells', is_correct: false }], type: 'multipleChoice' },
      { name: 'Bacteria are examples of which type of cell?', options: [{ text: 'Eukaryotic', is_correct: false }, { text: 'Multicellular', is_correct: false }, { text: 'Prokaryotic', is_correct: true }, { text: 'Animal', is_correct: false }], type: 'multipleChoice' },
      { name: 'What is the outermost layer of a prokaryotic cell?', options: [{ text: 'Cell membrane', is_correct: false }, { text: 'Cell wall', is_correct: true }, { text: 'Capsule', is_correct: false }, { text: 'Nucleus', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which structure controls what enters and leaves the cell?', options: [{ text: 'Cell wall', is_correct: false }, { text: 'Nucleus', is_correct: false }, { text: 'Cell membrane', is_correct: true }, { text: 'Ribosome', is_correct: false }], type: 'multipleChoice' },
      { name: 'Prokaryotic cells have DNA in the form of?', options: [{ text: 'Linear chromosomes', is_correct: false }, { text: 'Circular chromosome in cytoplasm', is_correct: true }, { text: 'DNA enclosed in nucleus', is_correct: false }, { text: 'Multiple nuclei', is_correct: false }], type: 'multipleChoice' },
      { name: 'The cell wall of bacteria is made of?', options: [{ text: 'Cellulose', is_correct: false }, { text: 'Chitin', is_correct: false }, { text: 'Peptidoglycan', is_correct: true }, { text: 'Lignin', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which organelle is present in prokaryotic cells?', options: [{ text: 'Mitochondria', is_correct: false }, { text: 'Ribosome', is_correct: true }, { text: 'Golgi apparatus', is_correct: false }, { text: 'Nucleus', is_correct: false }], type: 'multipleChoice' },
      { name: 'Prokaryotic ribosomes are of type?', options: [{ text: '80S', is_correct: false }, { text: '70S', is_correct: true }, { text: '60S', is_correct: false }, { text: '40S', is_correct: false }], type: 'multipleChoice' },
      { name: 'Cyanobacteria belong to which domain?', options: [{ text: 'Eukarya', is_correct: false }, { text: 'Archaea', is_correct: false }, { text: 'Bacteria', is_correct: true }, { text: 'Protista', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which structure helps bacteria move?', options: [{ text: 'Pili', is_correct: false }, { text: 'Flagella', is_correct: true }, { text: 'Capsule', is_correct: false }, { text: 'Plasmid', is_correct: false }], type: 'multipleChoice' },
      { name: 'Extra chromosomal circular DNA in bacteria is called?', options: [{ text: 'Nucleoid', is_correct: false }, { text: 'Plasmid', is_correct: true }, { text: 'Ribosome', is_correct: false }, { text: 'Capsule', is_correct: false }], type: 'multipleChoice' },
      { name: 'The protective outer layer of some bacteria is called?', options: [{ text: 'Cell wall', is_correct: false }, { text: 'Flagella', is_correct: false }, { text: 'Capsule', is_correct: true }, { text: 'Pili', is_correct: false }], type: 'multipleChoice' },
      { name: 'The region containing DNA in prokaryotes is called?', options: [{ text: 'Nucleus', is_correct: false }, { text: 'Nucleoid', is_correct: true }, { text: 'Cytoplasm', is_correct: false }, { text: 'Ribosome', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which is smaller: prokaryotic or eukaryotic cells?', options: [{ text: 'Eukaryotic', is_correct: false }, { text: 'Prokaryotic', is_correct: true }, { text: 'Both are same size', is_correct: false }, { text: 'Cannot be determined', is_correct: false }], type: 'multipleChoice' },
      { name: 'Mycoplasma is the smallest known?', options: [{ text: 'Virus', is_correct: false }, { text: 'Prokaryote', is_correct: true }, { text: 'Eukaryote', is_correct: false }, { text: 'Fungus', is_correct: false }], type: 'multipleChoice' },
      { name: 'The cell membrane in prokaryotes is also called?', options: [{ text: 'Nuclear membrane', is_correct: false }, { text: 'Plasma membrane', is_correct: true }, { text: 'Cell wall', is_correct: false }, { text: 'Tonoplast', is_correct: false }], type: 'multipleChoice' },
      { name: 'Prokaryotic cells reproduce by?', options: [{ text: 'Mitosis', is_correct: false }, { text: 'Meiosis', is_correct: false }, { text: 'Binary fission', is_correct: true }, { text: 'Budding only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which of the following is a prokaryote?', options: [{ text: 'Amoeba', is_correct: false }, { text: 'Mushroom', is_correct: false }, { text: 'E. coli', is_correct: true }, { text: 'Fern', is_correct: false }], type: 'multipleChoice' },
      { name: 'Membrane-bound organelles are absent in?', options: [{ text: 'Eukaryotic cells', is_correct: false }, { text: 'Prokaryotic cells', is_correct: true }, { text: 'Plant cells', is_correct: false }, { text: 'Animal cells', is_correct: false }], type: 'multipleChoice' },
      { name: 'The cytoplasm in a prokaryote is surrounded by?', options: [{ text: 'Nuclear envelope', is_correct: false }, { text: 'Plasma membrane', is_correct: true }, { text: 'Endoplasmic reticulum', is_correct: false }, { text: 'Tonoplast', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which bacteria can perform photosynthesis?', options: [{ text: 'E. coli', is_correct: false }, { text: 'Cyanobacteria', is_correct: true }, { text: 'Salmonella', is_correct: false }, { text: 'Staphylococcus', is_correct: false }], type: 'multipleChoice' },
      { name: 'Prokaryotes include which two domains?', options: [{ text: 'Bacteria and Eukarya', is_correct: false }, { text: 'Bacteria and Archaea', is_correct: true }, { text: 'Archaea and Eukarya', is_correct: false }, { text: 'Monera and Protista', is_correct: false }], type: 'multipleChoice' },
      { name: 'Pili in bacteria help in?', options: [{ text: 'Movement', is_correct: false }, { text: 'Gene transfer and attachment', is_correct: true }, { text: 'Energy production', is_correct: false }, { text: 'Photosynthesis', is_correct: false }], type: 'multipleChoice' },
      { name: 'The average size of a bacterial cell is?', options: [{ text: '1-10 micrometres', is_correct: true }, { text: '1-10 millimetres', is_correct: false }, { text: '1-10 centimetres', is_correct: false }, { text: '0.001 mm', is_correct: false }], type: 'multipleChoice' },
    ],
  },

  // ── Cells and Tissues / Cell Structure / Eukaryotic Cells ──────────────────
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Cells and Tissues',
    headingName: 'Cell Structure', subHeadingName: 'Eukaryotic Cells',
    questions: [
      { name: 'Eukaryotic cells have a?', options: [{ text: 'No nucleus', is_correct: false }, { text: 'Membrane-bound nucleus', is_correct: true }, { text: 'Nucleoid only', is_correct: false }, { text: 'Circular DNA in cytoplasm', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which of the following is a eukaryote?', options: [{ text: 'E. coli', is_correct: false }, { text: 'Bacterium', is_correct: false }, { text: 'Amoeba', is_correct: true }, { text: 'Cyanobacteria', is_correct: false }], type: 'multipleChoice' },
      { name: 'Eukaryotic ribosomes are of type?', options: [{ text: '70S', is_correct: false }, { text: '80S', is_correct: true }, { text: '60S', is_correct: false }, { text: '40S', is_correct: false }], type: 'multipleChoice' },
      { name: 'The nucleus of eukaryotic cells is surrounded by?', options: [{ text: 'Cell wall', is_correct: false }, { text: 'Nuclear envelope', is_correct: true }, { text: 'Plasma membrane', is_correct: false }, { text: 'Cytoplasm only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which organelle is the site of protein synthesis in eukaryotes?', options: [{ text: 'Nucleus', is_correct: false }, { text: 'Mitochondria', is_correct: false }, { text: 'Ribosome', is_correct: true }, { text: 'Vacuole', is_correct: false }], type: 'multipleChoice' },
      { name: 'Eukaryotic cells are generally?', options: [{ text: 'Smaller than prokaryotes', is_correct: false }, { text: 'Larger than prokaryotes', is_correct: true }, { text: 'The same size as prokaryotes', is_correct: false }, { text: 'Size varies with no pattern', is_correct: false }], type: 'multipleChoice' },
      { name: 'Membrane-bound organelles are found in?', options: [{ text: 'Prokaryotic cells only', is_correct: false }, { text: 'Eukaryotic cells', is_correct: true }, { text: 'Viruses', is_correct: false }, { text: 'Bacteria', is_correct: false }], type: 'multipleChoice' },
      { name: 'The endoplasmic reticulum is present in?', options: [{ text: 'Prokaryotes', is_correct: false }, { text: 'Eukaryotes', is_correct: true }, { text: 'Viruses', is_correct: false }, { text: 'Archaea only', is_correct: false }], type: 'multipleChoice' },
      { name: 'The nuclear material in eukaryotes is organized as?', options: [{ text: 'Circular naked DNA', is_correct: false }, { text: 'Linear chromosomes', is_correct: true }, { text: 'Plasmids', is_correct: false }, { text: 'Nucleoid', is_correct: false }], type: 'multipleChoice' },
      { name: 'Eukaryotic cells divide by?', options: [{ text: 'Binary fission only', is_correct: false }, { text: 'Mitosis and meiosis', is_correct: true }, { text: 'Budding only', is_correct: false }, { text: 'Fragmentation only', is_correct: false }], type: 'multipleChoice' },
      { name: 'A plant cell differs from an animal cell in having?', options: [{ text: 'Mitochondria', is_correct: false }, { text: 'Cell wall and chloroplasts', is_correct: true }, { text: 'Nucleus', is_correct: false }, { text: 'Ribosomes', is_correct: false }], type: 'multipleChoice' },
      { name: 'The cell wall of plant cells is made of?', options: [{ text: 'Chitin', is_correct: false }, { text: 'Cellulose', is_correct: true }, { text: 'Peptidoglycan', is_correct: false }, { text: 'Protein', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which organelle converts light energy to chemical energy?', options: [{ text: 'Mitochondria', is_correct: false }, { text: 'Chloroplast', is_correct: true }, { text: 'Ribosome', is_correct: false }, { text: 'Vacuole', is_correct: false }], type: 'multipleChoice' },
      { name: 'Animal cells have which structure absent in plant cells?', options: [{ text: 'Ribosome', is_correct: false }, { text: 'Nucleus', is_correct: false }, { text: 'Centrioles', is_correct: true }, { text: 'Mitochondria', is_correct: false }], type: 'multipleChoice' },
      { name: 'The large central vacuole is present in?', options: [{ text: 'Animal cells', is_correct: false }, { text: 'Bacterial cells', is_correct: false }, { text: 'Plant cells', is_correct: true }, { text: 'Fungal cells', is_correct: false }], type: 'multipleChoice' },
      { name: 'The nuclear pores allow?', options: [{ text: 'Light to enter nucleus', is_correct: false }, { text: 'Exchange of materials between nucleus and cytoplasm', is_correct: true }, { text: 'DNA to leave the cell', is_correct: false }, { text: 'Proteins to be destroyed', is_correct: false }], type: 'multipleChoice' },
      { name: 'Lysosomes are involved in?', options: [{ text: 'Protein synthesis', is_correct: false }, { text: 'Energy production', is_correct: false }, { text: 'Digestion of cellular waste', is_correct: true }, { text: 'Photosynthesis', is_correct: false }], type: 'multipleChoice' },
      { name: 'Smooth endoplasmic reticulum is involved in?', options: [{ text: 'Protein synthesis', is_correct: false }, { text: 'Lipid synthesis', is_correct: true }, { text: 'DNA replication', is_correct: false }, { text: 'Cell division', is_correct: false }], type: 'multipleChoice' },
      { name: 'Rough endoplasmic reticulum has ribosomes on its surface for?', options: [{ text: 'Lipid production', is_correct: false }, { text: 'Protein synthesis', is_correct: true }, { text: 'Energy storage', is_correct: false }, { text: 'Waste removal', is_correct: false }], type: 'multipleChoice' },
      { name: 'The Golgi apparatus packages and sends?', options: [{ text: 'DNA', is_correct: false }, { text: 'Proteins to their destinations', is_correct: true }, { text: 'Lipids to mitochondria', is_correct: false }, { text: 'RNA to ribosomes', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which cells have both cell wall and chloroplast?', options: [{ text: 'Animal cells', is_correct: false }, { text: 'Bacterial cells', is_correct: false }, { text: 'Plant cells', is_correct: true }, { text: 'Fungal cells', is_correct: false }], type: 'multipleChoice' },
      { name: 'Eukaryotic cells first appeared approximately?', options: [{ text: '500 million years ago', is_correct: false }, { text: '1.5 billion years ago', is_correct: true }, { text: '4 billion years ago', is_correct: false }, { text: '100 million years ago', is_correct: false }], type: 'multipleChoice' },
      { name: 'The cytoskeleton in eukaryotes provides?', options: [{ text: 'Energy', is_correct: false }, { text: 'Shape and support', is_correct: true }, { text: 'Genetic information', is_correct: false }, { text: 'Nutrients', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which eukaryotic organelle has its own DNA?', options: [{ text: 'Ribosome', is_correct: false }, { text: 'Golgi apparatus', is_correct: false }, { text: 'Mitochondria', is_correct: true }, { text: 'Lysosome', is_correct: false }], type: 'multipleChoice' },
      { name: 'Chloroplasts are found in?', options: [{ text: 'All eukaryotic cells', is_correct: false }, { text: 'Animal cells', is_correct: false }, { text: 'Plant and algal cells', is_correct: true }, { text: 'Fungal cells', is_correct: false }], type: 'multipleChoice' },
    ],
  },

  // ── Cells and Tissues / Cell Organelles / Mitochondria ─────────────────────
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Cells and Tissues',
    headingName: 'Cell Organelles', subHeadingName: 'Mitochondria',
    questions: [
      { name: 'Which organelle is known as the powerhouse of the cell?', options: [{ text: 'Nucleus', is_correct: false }, { text: 'Mitochondria', is_correct: true }, { text: 'Ribosome', is_correct: false }, { text: 'Golgi apparatus', is_correct: false }], type: 'multipleChoice' },
      { name: 'What is produced in mitochondria?', options: [{ text: 'Protein', is_correct: false }, { text: 'DNA', is_correct: false }, { text: 'ATP', is_correct: true }, { text: 'Glucose', is_correct: false }], type: 'multipleChoice' },
      { name: 'Mitochondria have how many membranes?', options: [{ text: 'One', is_correct: false }, { text: 'Two', is_correct: true }, { text: 'Three', is_correct: false }, { text: 'Four', is_correct: false }], type: 'multipleChoice' },
      { name: 'The inner membrane of mitochondria is folded into?', options: [{ text: 'Thylakoids', is_correct: false }, { text: 'Cristae', is_correct: true }, { text: 'Grana', is_correct: false }, { text: 'Lamellae', is_correct: false }], type: 'multipleChoice' },
      { name: 'The fluid-filled inner space of mitochondria is called?', options: [{ text: 'Stroma', is_correct: false }, { text: 'Lumen', is_correct: false }, { text: 'Matrix', is_correct: true }, { text: 'Cytosol', is_correct: false }], type: 'multipleChoice' },
      { name: 'Mitochondria have their own?', options: [{ text: 'Nucleus', is_correct: false }, { text: 'DNA and ribosomes', is_correct: true }, { text: 'Golgi apparatus', is_correct: false }, { text: 'Endoplasmic reticulum', is_correct: false }], type: 'multipleChoice' },
      { name: 'ATP stands for?', options: [{ text: 'Adenine Triphosphate', is_correct: false }, { text: 'Adenosine Triphosphate', is_correct: true }, { text: 'Adenosine Tri-protein', is_correct: false }, { text: 'Amino Triphosphate', is_correct: false }], type: 'multipleChoice' },
      { name: 'The process of ATP production in mitochondria is called?', options: [{ text: 'Photosynthesis', is_correct: false }, { text: 'Cellular respiration', is_correct: true }, { text: 'Fermentation', is_correct: false }, { text: 'Glycolysis only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which process occurs in the matrix of mitochondria?', options: [{ text: 'Glycolysis', is_correct: false }, { text: 'Krebs cycle', is_correct: true }, { text: 'Photosynthesis', is_correct: false }, { text: 'Translation', is_correct: false }], type: 'multipleChoice' },
      { name: 'Mitochondria are believed to have originated from?', options: [{ text: 'Nucleus', is_correct: false }, { text: 'Ancient bacteria', is_correct: true }, { text: 'Chloroplasts', is_correct: false }, { text: 'Endoplasmic reticulum', is_correct: false }], type: 'multipleChoice' },
      { name: 'The number of mitochondria in a cell depends on?', options: [{ text: 'Cell size only', is_correct: false }, { text: 'Energy requirements of the cell', is_correct: true }, { text: 'Number of nuclei', is_correct: false }, { text: 'Amount of DNA', is_correct: false }], type: 'multipleChoice' },
      { name: 'Muscle cells have many mitochondria because?', options: [{ text: 'They are large cells', is_correct: false }, { text: 'They need lots of energy', is_correct: true }, { text: 'They produce glucose', is_correct: false }, { text: 'They divide frequently', is_correct: false }], type: 'multipleChoice' },
      { name: 'The outer membrane of mitochondria is?', options: [{ text: 'Highly folded', is_correct: false }, { text: 'Smooth and permeable', is_correct: true }, { text: 'Impermeable to all molecules', is_correct: false }, { text: 'Made of cellulose', is_correct: false }], type: 'multipleChoice' },
      { name: 'The Krebs cycle produces?', options: [{ text: 'Glucose', is_correct: false }, { text: 'NADH and FADH2', is_correct: true }, { text: 'Oxygen', is_correct: false }, { text: 'Cellulose', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which gas is used by mitochondria for aerobic respiration?', options: [{ text: 'Carbon dioxide', is_correct: false }, { text: 'Nitrogen', is_correct: false }, { text: 'Oxygen', is_correct: true }, { text: 'Hydrogen', is_correct: false }], type: 'multipleChoice' },
      { name: 'Mitochondria are present in?', options: [{ text: 'Prokaryotes only', is_correct: false }, { text: 'All eukaryotic cells', is_correct: true }, { text: 'Plant cells only', is_correct: false }, { text: 'Animal cells only', is_correct: false }], type: 'multipleChoice' },
      { name: 'The energy currency of the cell is?', options: [{ text: 'DNA', is_correct: false }, { text: 'ATP', is_correct: true }, { text: 'RNA', is_correct: false }, { text: 'Glucose', is_correct: false }], type: 'multipleChoice' },
      { name: 'The theory that mitochondria evolved from bacteria is called?', options: [{ text: 'Cell theory', is_correct: false }, { text: 'Endosymbiotic theory', is_correct: true }, { text: 'Evolution theory', is_correct: false }, { text: 'Mutation theory', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which stage of respiration does NOT occur in mitochondria?', options: [{ text: 'Krebs cycle', is_correct: false }, { text: 'Electron transport chain', is_correct: false }, { text: 'Glycolysis', is_correct: true }, { text: 'Oxidative phosphorylation', is_correct: false }], type: 'multipleChoice' },
      { name: 'Mitochondrial DNA is inherited from?', options: [{ text: 'Father only', is_correct: false }, { text: 'Both parents equally', is_correct: false }, { text: 'Mother only', is_correct: true }, { text: 'Neither parent', is_correct: false }], type: 'multipleChoice' },
      { name: 'The inter-membrane space of mitochondria is between?', options: [{ text: 'Matrix and cytoplasm', is_correct: false }, { text: 'Inner and outer membrane', is_correct: true }, { text: 'Two inner membranes', is_correct: false }, { text: 'Cristae and grana', is_correct: false }], type: 'multipleChoice' },
      { name: 'How many ATP molecules are produced from one glucose in aerobic respiration?', options: [{ text: '2', is_correct: false }, { text: '36–38', is_correct: true }, { text: '100', is_correct: false }, { text: '10', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which molecule enters the Krebs cycle directly?', options: [{ text: 'Glucose', is_correct: false }, { text: 'Pyruvate', is_correct: false }, { text: 'Acetyl-CoA', is_correct: true }, { text: 'NADH', is_correct: false }], type: 'multipleChoice' },
      { name: 'Cells that lack mitochondria rely on?', options: [{ text: 'Aerobic respiration', is_correct: false }, { text: 'Anaerobic respiration', is_correct: true }, { text: 'Photosynthesis', is_correct: false }, { text: 'Oxidative phosphorylation', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which of the following is an energy-poor molecule that mitochondria convert to ATP?', options: [{ text: 'Glucose directly into ATP', is_correct: false }, { text: 'ADP', is_correct: true }, { text: 'RNA', is_correct: false }, { text: 'DNA', is_correct: false }], type: 'multipleChoice' },
    ],
  },

  // ── Cells and Tissues / Cell Organelles / Chloroplast ──────────────────────
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Cells and Tissues',
    headingName: 'Cell Organelles', subHeadingName: 'Chloroplast',
    questions: [
      { name: 'Chloroplasts are found in?', options: [{ text: 'Animal cells', is_correct: false }, { text: 'Plant and algal cells', is_correct: true }, { text: 'Bacterial cells', is_correct: false }, { text: 'All eukaryotic cells', is_correct: false }], type: 'multipleChoice' },
      { name: 'The main function of chloroplast is?', options: [{ text: 'Respiration', is_correct: false }, { text: 'Photosynthesis', is_correct: true }, { text: 'Protein synthesis', is_correct: false }, { text: 'DNA replication', is_correct: false }], type: 'multipleChoice' },
      { name: 'The green pigment in chloroplasts is called?', options: [{ text: 'Carotene', is_correct: false }, { text: 'Xanthophyll', is_correct: false }, { text: 'Chlorophyll', is_correct: true }, { text: 'Anthocyanin', is_correct: false }], type: 'multipleChoice' },
      { name: 'Chloroplasts have how many membranes?', options: [{ text: 'One', is_correct: false }, { text: 'Two', is_correct: true }, { text: 'Three', is_correct: false }, { text: 'None', is_correct: false }], type: 'multipleChoice' },
      { name: 'Stacked disc-like structures inside chloroplasts are called?', options: [{ text: 'Cristae', is_correct: false }, { text: 'Thylakoids/Grana', is_correct: true }, { text: 'Matrix', is_correct: false }, { text: 'Lamellae only', is_correct: false }], type: 'multipleChoice' },
      { name: 'The fluid-filled space surrounding grana in chloroplasts is called?', options: [{ text: 'Matrix', is_correct: false }, { text: 'Cytosol', is_correct: false }, { text: 'Stroma', is_correct: true }, { text: 'Lumen', is_correct: false }], type: 'multipleChoice' },
      { name: 'Light-dependent reactions of photosynthesis occur in?', options: [{ text: 'Stroma', is_correct: false }, { text: 'Thylakoid membranes', is_correct: true }, { text: 'Matrix', is_correct: false }, { text: 'Cytoplasm', is_correct: false }], type: 'multipleChoice' },
      { name: 'Light-independent reactions (Calvin cycle) occur in?', options: [{ text: 'Thylakoids', is_correct: false }, { text: 'Grana', is_correct: false }, { text: 'Stroma', is_correct: true }, { text: 'Cytoplasm', is_correct: false }], type: 'multipleChoice' },
      { name: 'Chlorophyll absorbs mainly which colors of light?', options: [{ text: 'Green and yellow', is_correct: false }, { text: 'Red and blue', is_correct: true }, { text: 'Orange and violet', is_correct: false }, { text: 'White light only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Plants appear green because chlorophyll?', options: [{ text: 'Absorbs green light', is_correct: false }, { text: 'Reflects green light', is_correct: true }, { text: 'Produces green light', is_correct: false }, { text: 'Does not interact with light', is_correct: false }], type: 'multipleChoice' },
      { name: 'Chloroplasts, like mitochondria, have their own?', options: [{ text: 'Golgi apparatus', is_correct: false }, { text: 'DNA and ribosomes', is_correct: true }, { text: 'Nucleus', is_correct: false }, { text: 'Vacuole', is_correct: false }], type: 'multipleChoice' },
      { name: 'The products of photosynthesis are?', options: [{ text: 'CO2 and water', is_correct: false }, { text: 'Glucose and oxygen', is_correct: true }, { text: 'ATP and NADH', is_correct: false }, { text: 'Proteins and lipids', is_correct: false }], type: 'multipleChoice' },
      { name: 'Chloroplasts are thought to have originated from?', options: [{ text: 'Mitochondria', is_correct: false }, { text: 'Ancient cyanobacteria', is_correct: true }, { text: 'Nucleus', is_correct: false }, { text: 'Ribosomes', is_correct: false }], type: 'multipleChoice' },
      { name: 'The chlorophyll molecule contains which metal ion?', options: [{ text: 'Iron (Fe)', is_correct: false }, { text: 'Magnesium (Mg)', is_correct: true }, { text: 'Zinc (Zn)', is_correct: false }, { text: 'Copper (Cu)', is_correct: false }], type: 'multipleChoice' },
      { name: 'Thylakoids are arranged in stacks called?', options: [{ text: 'Cristae', is_correct: false }, { text: 'Stroma', is_correct: false }, { text: 'Grana', is_correct: true }, { text: 'Lamella', is_correct: false }], type: 'multipleChoice' },
      { name: 'During photosynthesis, water molecules are split in a process called?', options: [{ text: 'Hydrolysis', is_correct: false }, { text: 'Photolysis', is_correct: true }, { text: 'Plasmolysis', is_correct: false }, { text: 'Lysis', is_correct: false }], type: 'multipleChoice' },
      { name: 'The oxygen released during photosynthesis comes from?', options: [{ text: 'Carbon dioxide', is_correct: false }, { text: 'Water molecules', is_correct: true }, { text: 'Glucose', is_correct: false }, { text: 'Chlorophyll', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which gas is absorbed by plants during photosynthesis?', options: [{ text: 'Oxygen', is_correct: false }, { text: 'Nitrogen', is_correct: false }, { text: 'Carbon dioxide', is_correct: true }, { text: 'Hydrogen', is_correct: false }], type: 'multipleChoice' },
      { name: 'Plastids that store starch are called?', options: [{ text: 'Chloroplasts', is_correct: false }, { text: 'Amyloplasts', is_correct: true }, { text: 'Chromoplasts', is_correct: false }, { text: 'Leucoplasts', is_correct: false }], type: 'multipleChoice' },
      { name: 'The number of chloroplasts per cell is highest in?', options: [{ text: 'Root cells', is_correct: false }, { text: 'Leaf mesophyll cells', is_correct: true }, { text: 'Stem cells', is_correct: false }, { text: 'Seed cells', is_correct: false }], type: 'multipleChoice' },
      { name: 'Carotenoids in chloroplasts are responsible for?', options: [{ text: 'Green color', is_correct: false }, { text: 'Yellow-orange colors', is_correct: true }, { text: 'Red color', is_correct: false }, { text: 'Blue color', is_correct: false }], type: 'multipleChoice' },
      { name: 'The Calvin cycle uses which molecules made in light reactions?', options: [{ text: 'Glucose and oxygen', is_correct: false }, { text: 'ATP and NADPH', is_correct: true }, { text: 'ADP and NADP+', is_correct: false }, { text: 'CO2 and water', is_correct: false }], type: 'multipleChoice' },
      { name: 'The first stable product of the Calvin cycle is?', options: [{ text: 'Glucose', is_correct: false }, { text: '3-phosphoglycerate (3-PGA)', is_correct: true }, { text: 'Pyruvate', is_correct: false }, { text: 'RuBP', is_correct: false }], type: 'multipleChoice' },
      { name: 'An autotroph uses chloroplasts to?', options: [{ text: 'Break down food', is_correct: false }, { text: 'Make food from sunlight', is_correct: true }, { text: 'Store genetic information', is_correct: false }, { text: 'Produce heat', is_correct: false }], type: 'multipleChoice' },
      { name: 'Chloroplasts move within plant cells in response to?', options: [{ text: 'Temperature', is_correct: false }, { text: 'Light intensity', is_correct: true }, { text: 'Water availability', is_correct: false }, { text: 'CO2 levels', is_correct: false }], type: 'multipleChoice' },
    ],
  },

  // ── Cells and Tissues / Cell Organelles / Nucleus and Ribosome ─────────────
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Cells and Tissues',
    headingName: 'Cell Organelles', subHeadingName: 'Nucleus and Ribosome',
    questions: [
      { name: 'The nucleus is called the control center because it contains?', options: [{ text: 'Proteins', is_correct: false }, { text: 'DNA / genetic information', is_correct: true }, { text: 'Ribosomes', is_correct: false }, { text: 'Lipids', is_correct: false }], type: 'multipleChoice' },
      { name: 'The nucleus is surrounded by the?', options: [{ text: 'Cell membrane', is_correct: false }, { text: 'Nuclear envelope', is_correct: true }, { text: 'Cell wall', is_correct: false }, { text: 'Tonoplast', is_correct: false }], type: 'multipleChoice' },
      { name: 'Ribosomes are the site of?', options: [{ text: 'Energy production', is_correct: false }, { text: 'Protein synthesis', is_correct: true }, { text: 'Lipid synthesis', is_correct: false }, { text: 'DNA replication', is_correct: false }], type: 'multipleChoice' },
      { name: 'Within the nucleus, DNA is associated with proteins called?', options: [{ text: 'Enzymes', is_correct: false }, { text: 'Histones', is_correct: true }, { text: 'Lipoproteins', is_correct: false }, { text: 'Glycoproteins', is_correct: false }], type: 'multipleChoice' },
      { name: 'The nucleolus inside the nucleus is responsible for making?', options: [{ text: 'DNA', is_correct: false }, { text: 'Ribosomal RNA (rRNA)', is_correct: true }, { text: 'Proteins directly', is_correct: false }, { text: 'Lipids', is_correct: false }], type: 'multipleChoice' },
      { name: 'Ribosomes can be found on?', options: [{ text: 'Smooth ER only', is_correct: false }, { text: 'Rough ER and free in cytoplasm', is_correct: true }, { text: 'Nucleus only', is_correct: false }, { text: 'Golgi apparatus only', is_correct: false }], type: 'multipleChoice' },
      { name: 'In eukaryotes, ribosomes are made of how many subunits?', options: [{ text: 'One', is_correct: false }, { text: 'Two', is_correct: true }, { text: 'Three', is_correct: false }, { text: 'Four', is_correct: false }], type: 'multipleChoice' },
      { name: 'The two subunits of a eukaryotic ribosome are?', options: [{ text: '30S and 50S', is_correct: false }, { text: '40S and 60S', is_correct: true }, { text: '20S and 40S', is_correct: false }, { text: '50S and 80S', is_correct: false }], type: 'multipleChoice' },
      { name: 'The nuclear pores allow molecules to pass?', options: [{ text: 'Only into the nucleus', is_correct: false }, { text: 'Both into and out of the nucleus', is_correct: true }, { text: 'Only out of the nucleus', is_correct: false }, { text: 'Nothing passes through', is_correct: false }], type: 'multipleChoice' },
      { name: 'The genetic material in the nucleus is called?', options: [{ text: 'Chromosome when condensed', is_correct: false }, { text: 'Chromatin when uncondensed', is_correct: false }, { text: 'Both are correct', is_correct: true }, { text: 'Neither is correct', is_correct: false }], type: 'multipleChoice' },
      { name: 'The process by which DNA makes RNA is called?', options: [{ text: 'Translation', is_correct: false }, { text: 'Transcription', is_correct: true }, { text: 'Replication', is_correct: false }, { text: 'Mutation', is_correct: false }], type: 'multipleChoice' },
      { name: 'The process by which RNA makes protein at ribosomes is called?', options: [{ text: 'Transcription', is_correct: false }, { text: 'Replication', is_correct: false }, { text: 'Translation', is_correct: true }, { text: 'Transduction', is_correct: false }], type: 'multipleChoice' },
      { name: 'Messenger RNA (mRNA) carries instructions from?', options: [{ text: 'Ribosome to nucleus', is_correct: false }, { text: 'Nucleus to ribosomes', is_correct: true }, { text: 'Cytoplasm to nucleus', is_correct: false }, { text: 'Mitochondria to nucleus', is_correct: false }], type: 'multipleChoice' },
      { name: 'Transfer RNA (tRNA) carries?', options: [{ text: 'Genetic code', is_correct: false }, { text: 'Amino acids to ribosomes', is_correct: true }, { text: 'Lipids to membranes', is_correct: false }, { text: 'Glucose to mitochondria', is_correct: false }], type: 'multipleChoice' },
      { name: 'The sequence of three nucleotides on mRNA is called a?', options: [{ text: 'Gene', is_correct: false }, { text: 'Codon', is_correct: true }, { text: 'Anticodon', is_correct: false }, { text: 'Chromosome', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which molecule brings amino acids to the ribosome?', options: [{ text: 'mRNA', is_correct: false }, { text: 'rRNA', is_correct: false }, { text: 'tRNA', is_correct: true }, { text: 'DNA', is_correct: false }], type: 'multipleChoice' },
      { name: 'Human body cells have how many chromosomes?', options: [{ text: '23', is_correct: false }, { text: '46', is_correct: true }, { text: '48', is_correct: false }, { text: '44', is_correct: false }], type: 'multipleChoice' },
      { name: 'Ribosomes are made of?', options: [{ text: 'DNA and protein', is_correct: false }, { text: 'RNA and protein', is_correct: true }, { text: 'Lipid and protein', is_correct: false }, { text: 'Carbohydrate and protein', is_correct: false }], type: 'multipleChoice' },
      { name: 'Cells with high protein production have many?', options: [{ text: 'Mitochondria', is_correct: false }, { text: 'Ribosomes', is_correct: true }, { text: 'Vacuoles', is_correct: false }, { text: 'Lysosomes', is_correct: false }], type: 'multipleChoice' },
      { name: 'The fluid inside the nucleus is called?', options: [{ text: 'Cytosol', is_correct: false }, { text: 'Nucleoplasm', is_correct: true }, { text: 'Cytoplasm', is_correct: false }, { text: 'Matrix', is_correct: false }], type: 'multipleChoice' },
      { name: 'A gene is a segment of?', options: [{ text: 'Protein', is_correct: false }, { text: 'RNA', is_correct: false }, { text: 'DNA', is_correct: true }, { text: 'Lipid', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which type of RNA makes up the ribosome structure?', options: [{ text: 'mRNA', is_correct: false }, { text: 'tRNA', is_correct: false }, { text: 'rRNA', is_correct: true }, { text: 'snRNA', is_correct: false }], type: 'multipleChoice' },
      { name: 'The nuclear membrane has pores to allow?', options: [{ text: 'Only DNA to exit', is_correct: false }, { text: 'Selective transport of molecules', is_correct: true }, { text: 'All molecules freely', is_correct: false }, { text: 'No molecules', is_correct: false }], type: 'multipleChoice' },
      { name: 'Prokaryotic ribosomes differ from eukaryotic in being?', options: [{ text: 'Larger', is_correct: false }, { text: 'Smaller (70S vs 80S)', is_correct: true }, { text: 'Made of DNA', is_correct: false }, { text: 'Absent in prokaryotes', is_correct: false }], type: 'multipleChoice' },
      { name: 'Antibiotic drugs often target bacterial ribosomes to?', options: [{ text: 'Kill host cells', is_correct: false }, { text: 'Stop bacterial protein synthesis', is_correct: true }, { text: 'Destroy bacterial DNA', is_correct: false }, { text: 'Disrupt bacterial membranes only', is_correct: false }], type: 'multipleChoice' },
    ],
  },

  // ── Introduction to Biology / Relationship with Other Sciences ─────────────
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Introduction to Biology',
    headingName: 'Relationship of Biology with Other Sciences', subHeadingName: '',
    questions: [
      { name: 'Biology and Chemistry together form which interdisciplinary field?', options: [{ text: 'Biophysics', is_correct: false }, { text: 'Biochemistry', is_correct: true }, { text: 'Biogeography', is_correct: false }, { text: 'Biomechanics', is_correct: false }], type: 'multipleChoice' },
      { name: 'Biology and Physics together form?', options: [{ text: 'Biochemistry', is_correct: false }, { text: 'Biophysics', is_correct: true }, { text: 'Biogeography', is_correct: false }, { text: 'Biotechnology', is_correct: false }], type: 'multipleChoice' },
      { name: 'The study of geographic distribution of organisms is?', options: [{ text: 'Ecology', is_correct: false }, { text: 'Biogeography', is_correct: true }, { text: 'Taxonomy', is_correct: false }, { text: 'Physiology', is_correct: false }], type: 'multipleChoice' },
      { name: 'Mathematics applied to biology is called?', options: [{ text: 'Biostatistics', is_correct: true }, { text: 'Biophysics', is_correct: false }, { text: 'Biochemistry', is_correct: false }, { text: 'Biotechnology', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which science helps biologists understand energy in living systems?', options: [{ text: 'Chemistry', is_correct: false }, { text: 'Geography', is_correct: false }, { text: 'Physics', is_correct: true }, { text: 'Astronomy', is_correct: false }], type: 'multipleChoice' },
      { name: 'Computer science is used in biology for?', options: [{ text: 'Analyzing DNA sequences (bioinformatics)', is_correct: true }, { text: 'Growing plants', is_correct: false }, { text: 'Breeding animals', is_correct: false }, { text: 'Making medicines only', is_correct: false }], type: 'multipleChoice' },
      { name: 'The field that uses engineering principles to solve biology problems is?', options: [{ text: 'Bioinformatics', is_correct: false }, { text: 'Bioengineering', is_correct: true }, { text: 'Biochemistry', is_correct: false }, { text: 'Biogeography', is_correct: false }], type: 'multipleChoice' },
      { name: 'Geology helps biology by providing evidence about?', options: [{ text: 'Cell functions', is_correct: false }, { text: 'Fossils and Earth history', is_correct: true }, { text: 'Chemical reactions', is_correct: false }, { text: 'Genetic code', is_correct: false }], type: 'multipleChoice' },
      { name: 'Pharmacology is the overlap of biology with which science?', options: [{ text: 'Chemistry and medicine', is_correct: true }, { text: 'Physics and geology', is_correct: false }, { text: 'Mathematics and astronomy', is_correct: false }, { text: 'Geography only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Social sciences benefit from biology through understanding of?', options: [{ text: 'Human behaviour and evolution', is_correct: true }, { text: 'Weather patterns', is_correct: false }, { text: 'Chemical reactions', is_correct: false }, { text: 'Mathematical formulas', is_correct: false }], type: 'multipleChoice' },
      { name: 'Forensic biology applies biology in?', options: [{ text: 'Agriculture', is_correct: false }, { text: 'Crime investigation', is_correct: true }, { text: 'Space exploration', is_correct: false }, { text: 'Weather prediction', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which of the following is a link between biology and astronomy?', options: [{ text: 'Astrobiology', is_correct: true }, { text: 'Biochemistry', is_correct: false }, { text: 'Biophysics', is_correct: false }, { text: 'Biogeography', is_correct: false }], type: 'multipleChoice' },
      { name: 'Nutrition science is the study of?', options: [{ text: 'Plants only', is_correct: false }, { text: 'Food and its effect on body', is_correct: true }, { text: 'Animal behavior', is_correct: false }, { text: 'Fossils', is_correct: false }], type: 'multipleChoice' },
      { name: 'Psychology has links to biology through studying?', options: [{ text: 'Chemical reactions', is_correct: false }, { text: 'The brain and nervous system', is_correct: true }, { text: 'Plant growth', is_correct: false }, { text: 'Fossils', is_correct: false }], type: 'multipleChoice' },
      { name: 'Environmental science combines biology with?', options: [{ text: 'Chemistry, geography, and ecology', is_correct: true }, { text: 'Mathematics only', is_correct: false }, { text: 'Astronomy only', is_correct: false }, { text: 'Physics only', is_correct: false }], type: 'multipleChoice' },
      { name: 'The study of organisms in space environments is called?', options: [{ text: 'Astrobiology', is_correct: true }, { text: 'Cosmology', is_correct: false }, { text: 'Biogeography', is_correct: false }, { text: 'Exobiology only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which discipline studies the chemistry of living organisms?', options: [{ text: 'Biophysics', is_correct: false }, { text: 'Biochemistry', is_correct: true }, { text: 'Biogeography', is_correct: false }, { text: 'Biomechanics', is_correct: false }], type: 'multipleChoice' },
      { name: 'Statistics in biology is used to?', options: [{ text: 'Analyze and interpret experimental data', is_correct: true }, { text: 'Grow organisms in lab', is_correct: false }, { text: 'Classify organisms', is_correct: false }, { text: 'Observe cells', is_correct: false }], type: 'multipleChoice' },
      { name: 'Agronomy links biology with?', options: [{ text: 'Agriculture', is_correct: true }, { text: 'Engineering', is_correct: false }, { text: 'Astronomy', is_correct: false }, { text: 'Geology', is_correct: false }], type: 'multipleChoice' },
      { name: 'Bionics is the application of?', options: [{ text: 'Biology principles to engineering', is_correct: true }, { text: 'Chemistry to biology', is_correct: false }, { text: 'Physics to chemistry', is_correct: false }, { text: 'Geography to biology', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which field uses genetic information to develop medicines?', options: [{ text: 'Pharmacogenomics', is_correct: true }, { text: 'Biogeography', is_correct: false }, { text: 'Biophysics', is_correct: false }, { text: 'Embryology', is_correct: false }], type: 'multipleChoice' },
      { name: 'Palaeoclimatology connects biology with?', options: [{ text: 'Geology and climate science', is_correct: true }, { text: 'Chemistry only', is_correct: false }, { text: 'Mathematics only', is_correct: false }, { text: 'Engineering only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Radiobiology studies the effects of?', options: [{ text: 'Sound on organisms', is_correct: false }, { text: 'Radiation on living organisms', is_correct: true }, { text: 'Light on plants', is_correct: false }, { text: 'Heat on cells', is_correct: false }], type: 'multipleChoice' },
      { name: 'Molecular biology studies life at the level of?', options: [{ text: 'Organs', is_correct: false }, { text: 'DNA, RNA, and proteins', is_correct: true }, { text: 'Ecosystems', is_correct: false }, { text: 'Species', is_correct: false }], type: 'multipleChoice' },
      { name: 'The union of biology and information technology is called?', options: [{ text: 'Bioinformatics', is_correct: true }, { text: 'Bionics', is_correct: false }, { text: 'Biomechanics', is_correct: false }, { text: 'Biotechnology', is_correct: false }], type: 'multipleChoice' },
    ],
  },

  // ── Biodiversity / Kingdoms of Life ─────────────────────────────────────────
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Biodiversity',
    headingName: 'Kingdoms of Life', subHeadingName: '',
    questions: [
      { name: 'Which kingdom is most diverse in terms of species?', options: [{ text: 'Plantae', is_correct: false }, { text: 'Fungi', is_correct: false }, { text: 'Animalia', is_correct: true }, { text: 'Monera', is_correct: false }], type: 'multipleChoice' },
      { name: 'Penicillium, the source of penicillin, belongs to kingdom?', options: [{ text: 'Plantae', is_correct: false }, { text: 'Animalia', is_correct: false }, { text: 'Fungi', is_correct: true }, { text: 'Protista', is_correct: false }], type: 'multipleChoice' },
      { name: 'Algae in kingdom Protista are?', options: [{ text: 'Heterotrophic', is_correct: false }, { text: 'Autotrophic', is_correct: true }, { text: 'Parasitic only', is_correct: false }, { text: 'Saprophytic', is_correct: false }], type: 'multipleChoice' },
      { name: 'Protozoa in kingdom Protista are?', options: [{ text: 'Autotrophic', is_correct: false }, { text: 'Heterotrophic', is_correct: true }, { text: 'Photosynthetic', is_correct: false }, { text: 'Saprophytic only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which kingdom includes mosses and ferns?', options: [{ text: 'Animalia', is_correct: false }, { text: 'Fungi', is_correct: false }, { text: 'Plantae', is_correct: true }, { text: 'Protista', is_correct: false }], type: 'multipleChoice' },
      { name: 'Members of Kingdom Monera reproduce by?', options: [{ text: 'Mitosis', is_correct: false }, { text: 'Binary fission', is_correct: true }, { text: 'Budding always', is_correct: false }, { text: 'Meiosis', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which kingdom includes the largest organism on Earth (giant sequoia)?', options: [{ text: 'Animalia', is_correct: false }, { text: 'Fungi', is_correct: false }, { text: 'Plantae', is_correct: true }, { text: 'Protista', is_correct: false }], type: 'multipleChoice' },
      { name: 'Bread mould (Rhizopus) belongs to kingdom?', options: [{ text: 'Protista', is_correct: false }, { text: 'Plantae', is_correct: false }, { text: 'Fungi', is_correct: true }, { text: 'Animalia', is_correct: false }], type: 'multipleChoice' },
      { name: 'Euglena is unusual because it is?', options: [{ text: 'Both autotrophic and heterotrophic', is_correct: true }, { text: 'Only heterotrophic', is_correct: false }, { text: 'Only autotrophic', is_correct: false }, { text: 'Non-living', is_correct: false }], type: 'multipleChoice' },
      { name: 'The malaria parasite Plasmodium belongs to kingdom?', options: [{ text: 'Animalia', is_correct: false }, { text: 'Monera', is_correct: false }, { text: 'Protista', is_correct: true }, { text: 'Fungi', is_correct: false }], type: 'multipleChoice' },
      { name: 'E. coli belongs to kingdom?', options: [{ text: 'Protista', is_correct: false }, { text: 'Monera', is_correct: true }, { text: 'Fungi', is_correct: false }, { text: 'Animalia', is_correct: false }], type: 'multipleChoice' },
      { name: 'Animals are characterized by?', options: [{ text: 'Having cell walls', is_correct: false }, { text: 'Being multicellular and heterotrophic', is_correct: true }, { text: 'Having chloroplasts', is_correct: false }, { text: 'Being unicellular', is_correct: false }], type: 'multipleChoice' },
      { name: 'Coral reefs are built by organisms of kingdom?', options: [{ text: 'Plantae', is_correct: false }, { text: 'Animalia', is_correct: true }, { text: 'Protista', is_correct: false }, { text: 'Fungi', is_correct: false }], type: 'multipleChoice' },
      { name: 'Lichen is a symbiotic association of?', options: [{ text: 'Two plants', is_correct: false }, { text: 'Fungi and algae/cyanobacteria', is_correct: true }, { text: 'Two animals', is_correct: false }, { text: 'Bacteria and protozoa', is_correct: false }], type: 'multipleChoice' },
      { name: 'The term "biodiversity" refers to?', options: [{ text: 'Diversity of ecosystems only', is_correct: false }, { text: 'Variety of life on Earth', is_correct: true }, { text: 'Number of plants only', is_correct: false }, { text: 'Number of animal species only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Vertebrates belong to kingdom?', options: [{ text: 'Plantae', is_correct: false }, { text: 'Protista', is_correct: false }, { text: 'Animalia', is_correct: true }, { text: 'Monera', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which kingdom lacks membrane-bound organelles?', options: [{ text: 'Protista', is_correct: false }, { text: 'Fungi', is_correct: false }, { text: 'Monera', is_correct: true }, { text: 'Plantae', is_correct: false }], type: 'multipleChoice' },
      { name: 'The study of the variety of life is called?', options: [{ text: 'Taxonomy', is_correct: false }, { text: 'Biodiversity', is_correct: true }, { text: 'Ecology', is_correct: false }, { text: 'Genetics', is_correct: false }], type: 'multipleChoice' },
      { name: 'Sponges belong to kingdom?', options: [{ text: 'Protista', is_correct: false }, { text: 'Plantae', is_correct: false }, { text: 'Animalia', is_correct: true }, { text: 'Fungi', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which kingdom includes seaweed?', options: [{ text: 'Plantae', is_correct: false }, { text: 'Fungi', is_correct: false }, { text: 'Protista', is_correct: true }, { text: 'Monera', is_correct: false }], type: 'multipleChoice' },
      { name: 'The cell walls of fungi are different from plants because they contain?', options: [{ text: 'Cellulose', is_correct: false }, { text: 'Chitin', is_correct: true }, { text: 'Pectin', is_correct: false }, { text: 'Lignin', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which kingdom includes athletes foot causing organisms?', options: [{ text: 'Animalia', is_correct: false }, { text: 'Protista', is_correct: false }, { text: 'Fungi', is_correct: true }, { text: 'Monera', is_correct: false }], type: 'multipleChoice' },
      { name: 'Autotrophic bacteria belong to kingdom?', options: [{ text: 'Protista', is_correct: false }, { text: 'Monera', is_correct: true }, { text: 'Plantae', is_correct: false }, { text: 'Animalia', is_correct: false }], type: 'multipleChoice' },
      { name: 'Diatoms belong to kingdom?', options: [{ text: 'Monera', is_correct: false }, { text: 'Plantae', is_correct: false }, { text: 'Protista', is_correct: true }, { text: 'Fungi', is_correct: false }], type: 'multipleChoice' },
      { name: 'Organisms that feed on dead organic matter are called?', options: [{ text: 'Autotrophs', is_correct: false }, { text: 'Parasites', is_correct: false }, { text: 'Decomposers/Saprophytes', is_correct: true }, { text: 'Predators', is_correct: false }], type: 'multipleChoice' },
    ],
  },

  // ── Cells and Tissues / Animal and Plant Cells ─────────────────────────────
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Cells and Tissues',
    headingName: 'Animal and Plant Cells', subHeadingName: '',
    questions: [
      { name: 'Which structure is present in plant cells but absent in animal cells?', options: [{ text: 'Nucleus', is_correct: false }, { text: 'Cell wall', is_correct: true }, { text: 'Mitochondria', is_correct: false }, { text: 'Ribosome', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which structure is present in animal cells but absent in plant cells?', options: [{ text: 'Chloroplast', is_correct: false }, { text: 'Vacuole', is_correct: false }, { text: 'Centrioles', is_correct: true }, { text: 'Cell wall', is_correct: false }], type: 'multipleChoice' },
      { name: 'Large central vacuoles are characteristic of?', options: [{ text: 'Animal cells', is_correct: false }, { text: 'Bacterial cells', is_correct: false }, { text: 'Plant cells', is_correct: true }, { text: 'Fungal cells', is_correct: false }], type: 'multipleChoice' },
      { name: 'Animal cells store energy as?', options: [{ text: 'Starch', is_correct: false }, { text: 'Glycogen', is_correct: true }, { text: 'Cellulose', is_correct: false }, { text: 'Chitin', is_correct: false }], type: 'multipleChoice' },
      { name: 'Plant cells store energy mainly as?', options: [{ text: 'Glycogen', is_correct: false }, { text: 'Fat', is_correct: false }, { text: 'Starch', is_correct: true }, { text: 'Protein', is_correct: false }], type: 'multipleChoice' },
      { name: 'The shape of animal cells is?', options: [{ text: 'Always rectangular', is_correct: false }, { text: 'Fixed and rigid', is_correct: false }, { text: 'Variable and irregular', is_correct: true }, { text: 'Always spherical', is_correct: false }], type: 'multipleChoice' },
      { name: 'The shape of plant cells is generally?', options: [{ text: 'Irregular', is_correct: false }, { text: 'Fixed and box-like due to cell wall', is_correct: true }, { text: 'Round always', is_correct: false }, { text: 'Star-shaped', is_correct: false }], type: 'multipleChoice' },
      { name: 'Turgor pressure in plant cells is provided by?', options: [{ text: 'Chloroplasts', is_correct: false }, { text: 'The cell wall resisting vacuole expansion', is_correct: true }, { text: 'Mitochondria', is_correct: false }, { text: 'Nucleus', is_correct: false }], type: 'multipleChoice' },
      { name: 'Plasmolysis occurs in plant cells when they are placed in?', options: [{ text: 'Hypotonic solution', is_correct: false }, { text: 'Hypertonic solution', is_correct: true }, { text: 'Distilled water', is_correct: false }, { text: 'Isotonic solution', is_correct: false }], type: 'multipleChoice' },
      { name: 'When a plant cell is placed in water, it becomes?', options: [{ text: 'Plasmolysed', is_correct: false }, { text: 'Turgid', is_correct: true }, { text: 'Flaccid', is_correct: false }, { text: 'Dead', is_correct: false }], type: 'multipleChoice' },
      { name: 'Chloroplasts are green because they contain?', options: [{ text: 'Carotene', is_correct: false }, { text: 'Chlorophyll', is_correct: true }, { text: 'Xanthophyll', is_correct: false }, { text: 'Anthocyanin', is_correct: false }], type: 'multipleChoice' },
      { name: 'The process by which water moves into cells by osmosis is?', options: [{ text: 'Active transport', is_correct: false }, { text: 'Endocytosis', is_correct: false }, { text: 'Osmosis', is_correct: true }, { text: 'Diffusion of solutes', is_correct: false }], type: 'multipleChoice' },
      { name: 'Both plant and animal cells share which organelle?', options: [{ text: 'Chloroplast', is_correct: false }, { text: 'Cell wall', is_correct: false }, { text: 'Mitochondria', is_correct: true }, { text: 'Centriole', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which of the following is true of both plant and animal cells?', options: [{ text: 'Both have cell walls', is_correct: false }, { text: 'Both have a nucleus', is_correct: true }, { text: 'Both have chloroplasts', is_correct: false }, { text: 'Both have large central vacuoles', is_correct: false }], type: 'multipleChoice' },
      { name: 'Root hair cells are specialised for?', options: [{ text: 'Photosynthesis', is_correct: false }, { text: 'Absorbing water and minerals', is_correct: true }, { text: 'Transport of food', is_correct: false }, { text: 'Support', is_correct: false }], type: 'multipleChoice' },
      { name: 'Red blood cells lack a nucleus in order to?', options: [{ text: 'Divide faster', is_correct: false }, { text: 'Carry more haemoglobin', is_correct: true }, { text: 'Survive longer', is_correct: false }, { text: 'Move faster', is_correct: false }], type: 'multipleChoice' },
      { name: 'The middle lamella between plant cells is made of?', options: [{ text: 'Cellulose', is_correct: false }, { text: 'Pectin', is_correct: true }, { text: 'Chitin', is_correct: false }, { text: 'Protein', is_correct: false }], type: 'multipleChoice' },
      { name: 'Plasmodesmata in plant cells allow?', options: [{ text: 'Cell division', is_correct: false }, { text: 'Communication between adjacent cells', is_correct: true }, { text: 'Photosynthesis', is_correct: false }, { text: 'Water absorption', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which cell type contains haemoglobin?', options: [{ text: 'White blood cell', is_correct: false }, { text: 'Red blood cell', is_correct: true }, { text: 'Platelet', is_correct: false }, { text: 'Neuron', is_correct: false }], type: 'multipleChoice' },
      { name: 'Guard cells in plants control?', options: [{ text: 'Photosynthesis rate', is_correct: false }, { text: 'Opening and closing of stomata', is_correct: true }, { text: 'Absorption of minerals', is_correct: false }, { text: 'Seed germination', is_correct: false }], type: 'multipleChoice' },
      { name: 'The cell theory states that all living things are made of?', options: [{ text: 'Atoms', is_correct: false }, { text: 'Cells', is_correct: true }, { text: 'Tissues', is_correct: false }, { text: 'Molecules', is_correct: false }], type: 'multipleChoice' },
      { name: 'New cells arise only from?', options: [{ text: 'Non-living matter', is_correct: false }, { text: 'Pre-existing cells', is_correct: true }, { text: 'Spontaneous generation', is_correct: false }, { text: 'Viruses', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which organelle digests worn-out organelles?', options: [{ text: 'Ribosome', is_correct: false }, { text: 'Lysosome', is_correct: true }, { text: 'Nucleus', is_correct: false }, { text: 'Vacuole', is_correct: false }], type: 'multipleChoice' },
      { name: 'The cell membrane is composed of?', options: [{ text: 'Cellulose only', is_correct: false }, { text: 'Phospholipid bilayer with proteins', is_correct: true }, { text: 'Protein only', is_correct: false }, { text: 'Chitin and protein', is_correct: false }], type: 'multipleChoice' },
      { name: 'The term "cell" was first used by?', options: [{ text: 'Aristotle', is_correct: false }, { text: 'Robert Hooke', is_correct: true }, { text: 'Virchow', is_correct: false }, { text: 'Schleiden', is_correct: false }], type: 'multipleChoice' },
    ],
  },
  // ── Biodiversity / Binomial Nomenclature heading ───────────────────────────
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Biodiversity',
    headingName: 'Binomial Nomenclature', subHeadingName: '',
    questions: [
      { name: 'Who is called the father of taxonomy?', options: [{ text: 'Darwin', is_correct: false }, { text: 'Carolus Linnaeus', is_correct: true }, { text: 'Mendel', is_correct: false }, { text: 'Pasteur', is_correct: false }], type: 'multipleChoice' },
      { name: 'The book Systema Naturae was written by?', options: [{ text: 'Darwin', is_correct: false }, { text: 'Linnaeus', is_correct: true }, { text: 'Mendel', is_correct: false }, { text: 'Hooke', is_correct: false }], type: 'multipleChoice' },
      { name: 'How many words are used in a binomial name?', options: [{ text: 'One', is_correct: false }, { text: 'Two', is_correct: true }, { text: 'Three', is_correct: false }, { text: 'Four', is_correct: false }], type: 'multipleChoice' },
      { name: 'The scientific name of dog is?', options: [{ text: 'Felis lupus', is_correct: false }, { text: 'Canis lupus familiaris', is_correct: false }, { text: 'Canis familiaris', is_correct: true }, { text: 'Lupus canis', is_correct: false }], type: 'multipleChoice' },
      { name: 'In handwritten text, scientific names are?', options: [{ text: 'Printed normally', is_correct: false }, { text: 'Underlined', is_correct: true }, { text: 'Written in bold', is_correct: false }, { text: 'Written in brackets', is_correct: false }], type: 'multipleChoice' },
      { name: 'The scientific name of onion is?', options: [{ text: 'Allium cepa', is_correct: true }, { text: 'Allium sativum', is_correct: false }, { text: 'Solanum lycopersicum', is_correct: false }, { text: 'Capsicum annuum', is_correct: false }], type: 'multipleChoice' },
      { name: 'The scientific name of garlic is?', options: [{ text: 'Allium cepa', is_correct: false }, { text: 'Allium sativum', is_correct: true }, { text: 'Allium porrum', is_correct: false }, { text: 'Allium schoenoprasum', is_correct: false }], type: 'multipleChoice' },
      { name: 'The phylum of animals with a backbone is?', options: [{ text: 'Arthropoda', is_correct: false }, { text: 'Chordata', is_correct: true }, { text: 'Annelida', is_correct: false }, { text: 'Mollusca', is_correct: false }], type: 'multipleChoice' },
      { name: 'Humans belong to which order?', options: [{ text: 'Carnivora', is_correct: false }, { text: 'Primates', is_correct: true }, { text: 'Rodentia', is_correct: false }, { text: 'Artiodactyla', is_correct: false }], type: 'multipleChoice' },
      { name: 'The family of humans is?', options: [{ text: 'Pongidae', is_correct: false }, { text: 'Hominidae', is_correct: true }, { text: 'Cercopithecidae', is_correct: false }, { text: 'Hylobatidae', is_correct: false }], type: 'multipleChoice' },
      { name: 'Tiger and lion belong to the same?', options: [{ text: 'Species', is_correct: false }, { text: 'Genus (Panthera)', is_correct: true }, { text: 'Family only', is_correct: false }, { text: 'Order only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which level of taxonomy is most specific?', options: [{ text: 'Kingdom', is_correct: false }, { text: 'Family', is_correct: false }, { text: 'Species', is_correct: true }, { text: 'Phylum', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which level of taxonomy is most general?', options: [{ text: 'Species', is_correct: false }, { text: 'Genus', is_correct: false }, { text: 'Kingdom', is_correct: true }, { text: 'Order', is_correct: false }], type: 'multipleChoice' },
      { name: 'The scientific name of potato is?', options: [{ text: 'Solanum lycopersicum', is_correct: false }, { text: 'Solanum tuberosum', is_correct: true }, { text: 'Solanum melongena', is_correct: false }, { text: 'Solanum nigrum', is_correct: false }], type: 'multipleChoice' },
      { name: 'The scientific name of tomato is?', options: [{ text: 'Solanum tuberosum', is_correct: false }, { text: 'Solanum lycopersicum', is_correct: true }, { text: 'Solanum melongena', is_correct: false }, { text: 'Capsicum annuum', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which feature is used to separate species?', options: [{ text: 'Same kingdom', is_correct: false }, { text: 'Inability to interbreed and produce fertile offspring', is_correct: true }, { text: 'Same family', is_correct: false }, { text: 'Same genus', is_correct: false }], type: 'multipleChoice' },
      { name: 'The class of mammals is?', options: [{ text: 'Reptilia', is_correct: false }, { text: 'Mammalia', is_correct: true }, { text: 'Aves', is_correct: false }, { text: 'Amphibia', is_correct: false }], type: 'multipleChoice' },
      { name: 'Birds belong to class?', options: [{ text: 'Mammalia', is_correct: false }, { text: 'Reptilia', is_correct: false }, { text: 'Aves', is_correct: true }, { text: 'Amphibia', is_correct: false }], type: 'multipleChoice' },
      { name: 'The phylum of insects is?', options: [{ text: 'Chordata', is_correct: false }, { text: 'Mollusca', is_correct: false }, { text: 'Arthropoda', is_correct: true }, { text: 'Annelida', is_correct: false }], type: 'multipleChoice' },
      { name: 'The scientific name of corn (maize) is?', options: [{ text: 'Triticum aestivum', is_correct: false }, { text: 'Oryza sativa', is_correct: false }, { text: 'Zea mays', is_correct: true }, { text: 'Hordeum vulgare', is_correct: false }], type: 'multipleChoice' },
      { name: 'Closely related species are grouped into the same?', options: [{ text: 'Kingdom', is_correct: false }, { text: 'Phylum', is_correct: false }, { text: 'Genus', is_correct: true }, { text: 'Class', is_correct: false }], type: 'multipleChoice' },
      { name: 'Classification helps scientists to?', options: [{ text: 'Communicate about organisms universally', is_correct: true }, { text: 'Grow organisms in lab', is_correct: false }, { text: 'Cure diseases only', is_correct: false }, { text: 'Predict weather', is_correct: false }], type: 'multipleChoice' },
      { name: 'The scientific name of sparrow is?', options: [{ text: 'Passer domesticus', is_correct: true }, { text: 'Corvus splendens', is_correct: false }, { text: 'Columba livia', is_correct: false }, { text: 'Hirundo rustica', is_correct: false }], type: 'multipleChoice' },
      { name: 'The scientific name of crow is?', options: [{ text: 'Passer domesticus', is_correct: false }, { text: 'Corvus splendens', is_correct: true }, { text: 'Columba livia', is_correct: false }, { text: 'Milvus migrans', is_correct: false }], type: 'multipleChoice' },
      { name: 'Natural classification is based on?', options: [{ text: 'One or two features', is_correct: false }, { text: 'Evolutionary relationships', is_correct: true }, { text: 'Size of organisms', is_correct: false }, { text: 'Habitat only', is_correct: false }], type: 'multipleChoice' },
    ],
  },

  // ── Cells and Tissues / Cell Organelles / Golgi and Vacuole ────────────────
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Cells and Tissues',
    headingName: 'Cell Organelles', subHeadingName: '',
    questions: [
      { name: 'Which organelle is called the "post office" of the cell?', options: [{ text: 'Ribosome', is_correct: false }, { text: 'Golgi apparatus', is_correct: true }, { text: 'Lysosome', is_correct: false }, { text: 'Mitochondria', is_correct: false }], type: 'multipleChoice' },
      { name: 'Lysosomes are produced by the?', options: [{ text: 'Nucleus', is_correct: false }, { text: 'Golgi apparatus', is_correct: true }, { text: 'Mitochondria', is_correct: false }, { text: 'Ribosome', is_correct: false }], type: 'multipleChoice' },
      { name: 'Vacuoles store?', options: [{ text: 'Only water', is_correct: false }, { text: 'Water, nutrients, or waste products', is_correct: true }, { text: 'DNA only', is_correct: false }, { text: 'Proteins only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which organelle breaks down foreign particles (e.g. bacteria) in cells?', options: [{ text: 'Ribosome', is_correct: false }, { text: 'Lysosome', is_correct: true }, { text: 'Vacuole', is_correct: false }, { text: 'Mitochondria', is_correct: false }], type: 'multipleChoice' },
      { name: 'The endoplasmic reticulum connects to?', options: [{ text: 'Mitochondria', is_correct: false }, { text: 'The nuclear envelope', is_correct: true }, { text: 'Chloroplast', is_correct: false }, { text: 'The plasma membrane only', is_correct: false }], type: 'multipleChoice' },
      { name: 'The Golgi apparatus was discovered by?', options: [{ text: 'Hooke', is_correct: false }, { text: 'Camillo Golgi', is_correct: true }, { text: 'Schleiden', is_correct: false }, { text: 'Virchow', is_correct: false }], type: 'multipleChoice' },
      { name: 'Secretory proteins are packaged by?', options: [{ text: 'Ribosome', is_correct: false }, { text: 'Golgi apparatus', is_correct: true }, { text: 'Lysosome', is_correct: false }, { text: 'Vacuole', is_correct: false }], type: 'multipleChoice' },
      { name: 'Centrioles are involved in?', options: [{ text: 'Protein synthesis', is_correct: false }, { text: 'Cell division (forming spindle fibres)', is_correct: true }, { text: 'Photosynthesis', is_correct: false }, { text: 'Energy production', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which organelle is absent in mature red blood cells?', options: [{ text: 'Ribosome', is_correct: false }, { text: 'All membrane-bound organelles', is_correct: true }, { text: 'Cell membrane', is_correct: false }, { text: 'Cytoplasm', is_correct: false }], type: 'multipleChoice' },
      { name: 'The cytoskeleton is made of?', options: [{ text: 'Cellulose fibres', is_correct: false }, { text: 'Protein filaments (actin, tubulin)', is_correct: true }, { text: 'Lipid bilayer', is_correct: false }, { text: 'DNA strands', is_correct: false }], type: 'multipleChoice' },
      { name: 'Peroxisomes break down?', options: [{ text: 'Glucose', is_correct: false }, { text: 'Hydrogen peroxide', is_correct: true }, { text: 'Proteins', is_correct: false }, { text: 'Lipids only', is_correct: false }], type: 'multipleChoice' },
      { name: 'The fluid part of the cytoplasm (excluding organelles) is called?', options: [{ text: 'Nucleoplasm', is_correct: false }, { text: 'Cytosol', is_correct: true }, { text: 'Matrix', is_correct: false }, { text: 'Stroma', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which structure allows plant cells to withstand low water potential?', options: [{ text: 'Chloroplast', is_correct: false }, { text: 'Cell wall', is_correct: true }, { text: 'Vacuole alone', is_correct: false }, { text: 'Ribosome', is_correct: false }], type: 'multipleChoice' },
      { name: 'Microfilaments in the cytoskeleton are made of?', options: [{ text: 'Tubulin', is_correct: false }, { text: 'Actin', is_correct: true }, { text: 'Myosin', is_correct: false }, { text: 'Keratin', is_correct: false }], type: 'multipleChoice' },
      { name: 'Microtubules in the cytoskeleton are made of?', options: [{ text: 'Actin', is_correct: false }, { text: 'Tubulin', is_correct: true }, { text: 'Myosin', is_correct: false }, { text: 'Collagen', is_correct: false }], type: 'multipleChoice' },
      { name: 'Flagella in eukaryotes are made of?', options: [{ text: 'Actin filaments', is_correct: false }, { text: 'Microtubules (9+2 arrangement)', is_correct: true }, { text: 'Cellulose', is_correct: false }, { text: 'Peptidoglycan', is_correct: false }], type: 'multipleChoice' },
      { name: 'The nuclear envelope has how many membranes?', options: [{ text: 'One', is_correct: false }, { text: 'Two', is_correct: true }, { text: 'Three', is_correct: false }, { text: 'Four', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which organelle helps in detoxification of drugs?', options: [{ text: 'Rough ER', is_correct: false }, { text: 'Smooth ER', is_correct: true }, { text: 'Nucleus', is_correct: false }, { text: 'Ribosome', is_correct: false }], type: 'multipleChoice' },
      { name: 'Vesicles are small membrane-bound sacs that?', options: [{ text: 'Produce energy', is_correct: false }, { text: 'Transport materials within the cell', is_correct: true }, { text: 'Store DNA', is_correct: false }, { text: 'Synthesize proteins', is_correct: false }], type: 'multipleChoice' },
      { name: 'Exocytosis is the process by which cells?', options: [{ text: 'Take in materials', is_correct: false }, { text: 'Release materials to outside', is_correct: true }, { text: 'Divide', is_correct: false }, { text: 'Absorb water', is_correct: false }], type: 'multipleChoice' },
      { name: 'Endocytosis is the process by which cells?', options: [{ text: 'Release materials', is_correct: false }, { text: 'Engulf materials from outside', is_correct: true }, { text: 'Produce ATP', is_correct: false }, { text: 'Divide', is_correct: false }], type: 'multipleChoice' },
      { name: 'Phagocytosis is the engulfing of?', options: [{ text: 'Liquids', is_correct: false }, { text: 'Solid particles', is_correct: true }, { text: 'Gases', is_correct: false }, { text: 'Light energy', is_correct: false }], type: 'multipleChoice' },
      { name: 'Pinocytosis is the engulfing of?', options: [{ text: 'Solid particles', is_correct: false }, { text: 'Liquids', is_correct: true }, { text: 'Gases', is_correct: false }, { text: 'Viruses only', is_correct: false }], type: 'multipleChoice' },
      { name: 'The cell membrane is described as selectively permeable, meaning?', options: [{ text: 'Nothing can pass through', is_correct: false }, { text: 'Only certain molecules can pass', is_correct: true }, { text: 'Everything can pass freely', is_correct: false }, { text: 'Only water can pass', is_correct: false }], type: 'multipleChoice' },
      { name: 'Active transport moves molecules?', options: [{ text: 'Along the concentration gradient', is_correct: false }, { text: 'Against the concentration gradient using energy', is_correct: true }, { text: 'Without using energy', is_correct: false }, { text: 'Only into the nucleus', is_correct: false }], type: 'multipleChoice' },
    ],
  },

  // ── Introduction to Biology / Safety and Lab Skills ────────────────────────
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Introduction to Biology',
    headingName: 'Relationship of Biology with Other Sciences', subHeadingName: '',
    questions: [
      { name: 'The scientific method starts with?', options: [{ text: 'Conclusion', is_correct: false }, { text: 'Observation', is_correct: true }, { text: 'Hypothesis', is_correct: false }, { text: 'Experiment', is_correct: false }], type: 'multipleChoice' },
      { name: 'A hypothesis is a?', options: [{ text: 'Proven fact', is_correct: false }, { text: 'Testable prediction', is_correct: true }, { text: 'Final conclusion', is_correct: false }, { text: 'Law of nature', is_correct: false }], type: 'multipleChoice' },
      { name: 'A controlled experiment changes?', options: [{ text: 'All variables', is_correct: false }, { text: 'Only one variable at a time', is_correct: true }, { text: 'No variables', is_correct: false }, { text: 'Only the dependent variable directly', is_correct: false }], type: 'multipleChoice' },
      { name: 'The variable that is deliberately changed in an experiment is the?', options: [{ text: 'Dependent variable', is_correct: false }, { text: 'Independent variable', is_correct: true }, { text: 'Controlled variable', is_correct: false }, { text: 'Random variable', is_correct: false }], type: 'multipleChoice' },
      { name: 'The variable that is measured in an experiment is the?', options: [{ text: 'Independent variable', is_correct: false }, { text: 'Dependent variable', is_correct: true }, { text: 'Controlled variable', is_correct: false }, { text: 'Random variable', is_correct: false }], type: 'multipleChoice' },
      { name: 'A theory in science is?', options: [{ text: 'A guess', is_correct: false }, { text: 'A well-tested explanation supported by evidence', is_correct: true }, { text: 'An unproven idea', is_correct: false }, { text: 'The same as a hypothesis', is_correct: false }], type: 'multipleChoice' },
      { name: 'A scientific law describes?', options: [{ text: 'Why something happens', is_correct: false }, { text: 'What happens under certain conditions', is_correct: true }, { text: 'An unproven prediction', is_correct: false }, { text: 'Legal rules in biology', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which instrument is used to observe cells?', options: [{ text: 'Telescope', is_correct: false }, { text: 'Microscope', is_correct: true }, { text: 'Thermometer', is_correct: false }, { text: 'Barometer', is_correct: false }], type: 'multipleChoice' },
      { name: 'Who invented the first simple microscope?', options: [{ text: 'Robert Hooke', is_correct: false }, { text: 'Anton van Leeuwenhoek', is_correct: true }, { text: 'Galileo', is_correct: false }, { text: 'Pasteur', is_correct: false }], type: 'multipleChoice' },
      { name: 'Robert Hooke observed cells in?', options: [{ text: 'Skin tissue', is_correct: false }, { text: 'Cork (dead plant cells)', is_correct: true }, { text: 'Blood', is_correct: false }, { text: 'Pond water', is_correct: false }], type: 'multipleChoice' },
      { name: 'The cell theory was proposed by?', options: [{ text: 'Pasteur and Koch', is_correct: false }, { text: 'Schleiden, Schwann, and Virchow', is_correct: true }, { text: 'Darwin and Mendel', is_correct: false }, { text: 'Hooke and Leeuwenhoek', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which of the following is NOT part of the cell theory?', options: [{ text: 'All living things are made of cells', is_correct: false }, { text: 'Cells are the basic unit of life', is_correct: false }, { text: 'Cells arise from non-living matter', is_correct: true }, { text: 'New cells come from pre-existing cells', is_correct: false }], type: 'multipleChoice' },
      { name: 'The magnification of a compound microscope is calculated by?', options: [{ text: 'Adding eyepiece and objective lens powers', is_correct: false }, { text: 'Multiplying eyepiece and objective lens powers', is_correct: true }, { text: 'Dividing eyepiece by objective', is_correct: false }, { text: 'Subtracting the powers', is_correct: false }], type: 'multipleChoice' },
      { name: 'The resolving power of a microscope means its ability to?', options: [{ text: 'Magnify objects', is_correct: false }, { text: 'Distinguish two close points as separate', is_correct: true }, { text: 'Focus on moving objects', is_correct: false }, { text: 'Produce colored images', is_correct: false }], type: 'multipleChoice' },
      { name: 'An electron microscope uses which instead of light?', options: [{ text: 'Radio waves', is_correct: false }, { text: 'Electrons', is_correct: true }, { text: 'X-rays', is_correct: false }, { text: 'Sound waves', is_correct: false }], type: 'multipleChoice' },
      { name: 'Data in biology can be presented as?', options: [{ text: 'Tables, graphs, and charts', is_correct: true }, { text: 'Words only', is_correct: false }, { text: 'Numbers only', is_correct: false }, { text: 'Hypotheses only', is_correct: false }], type: 'multipleChoice' },
      { name: 'A biologist uses models to?', options: [{ text: 'Replace real experiments', is_correct: false }, { text: 'Simplify and represent complex systems', is_correct: true }, { text: 'Avoid observations', is_correct: false }, { text: 'Only teach students', is_correct: false }], type: 'multipleChoice' },
      { name: 'The word "biology" means?', options: [{ text: 'Study of earth', is_correct: false }, { text: 'Study of life (bios = life, logos = study)', is_correct: true }, { text: 'Study of chemicals', is_correct: false }, { text: 'Study of matter', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which of these best describes a living thing?', options: [{ text: 'Made of metal', is_correct: false }, { text: 'Grows, reproduces, and responds to stimuli', is_correct: true }, { text: 'Only made of cells', is_correct: false }, { text: 'Can move only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Biology contributes to medicine by?', options: [{ text: 'Predicting earthquakes', is_correct: false }, { text: 'Understanding disease and developing cures', is_correct: true }, { text: 'Designing computers', is_correct: false }, { text: 'Studying stars', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which concept explains how traits are passed to offspring?', options: [{ text: 'Cell theory', is_correct: false }, { text: 'Genetics', is_correct: true }, { text: 'Ecology', is_correct: false }, { text: 'Evolution', is_correct: false }], type: 'multipleChoice' },
      { name: 'Evolution theory was proposed by?', options: [{ text: 'Mendel', is_correct: false }, { text: 'Darwin', is_correct: true }, { text: 'Pasteur', is_correct: false }, { text: 'Hooke', is_correct: false }], type: 'multipleChoice' },
      { name: 'Natural selection is the mechanism of?', options: [{ text: 'Genetics', is_correct: false }, { text: 'Evolution', is_correct: true }, { text: 'Cell division', is_correct: false }, { text: 'Reproduction', is_correct: false }], type: 'multipleChoice' },
      { name: 'Bioinformatics helps scientists?', options: [{ text: 'Build machines', is_correct: false }, { text: 'Analyze biological data using computers', is_correct: true }, { text: 'Grow crops', is_correct: false }, { text: 'Study weather', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which of the following is an example of applied biology?', options: [{ text: 'Studying star formation', is_correct: false }, { text: 'Developing vaccines', is_correct: true }, { text: 'Building bridges', is_correct: false }, { text: 'Designing aircraft', is_correct: false }], type: 'multipleChoice' },
    ],
  },

  // ── Cells and Tissues / Diffusion and Osmosis ──────────────────────────────
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Cells and Tissues',
    headingName: 'Cell Structure', subHeadingName: '',
    questions: [
      { name: 'Diffusion is the movement of molecules from?', options: [{ text: 'Low to high concentration', is_correct: false }, { text: 'High to low concentration', is_correct: true }, { text: 'Equal concentration to equal', is_correct: false }, { text: 'Against the gradient always', is_correct: false }], type: 'multipleChoice' },
      { name: 'Osmosis is the diffusion of?', options: [{ text: 'Solutes through a membrane', is_correct: false }, { text: 'Water through a semi-permeable membrane', is_correct: true }, { text: 'Gases through a membrane', is_correct: false }, { text: 'All molecules through a membrane', is_correct: false }], type: 'multipleChoice' },
      { name: 'A solution with higher solute concentration than the cell is?', options: [{ text: 'Hypotonic', is_correct: false }, { text: 'Isotonic', is_correct: false }, { text: 'Hypertonic', is_correct: true }, { text: 'Neutral', is_correct: false }], type: 'multipleChoice' },
      { name: 'A solution with lower solute concentration than the cell is?', options: [{ text: 'Hypertonic', is_correct: false }, { text: 'Isotonic', is_correct: false }, { text: 'Hypotonic', is_correct: true }, { text: 'Neutral', is_correct: false }], type: 'multipleChoice' },
      { name: 'When a cell is placed in an isotonic solution, it?', options: [{ text: 'Swells up', is_correct: false }, { text: 'Shrinks', is_correct: false }, { text: 'Remains the same size', is_correct: true }, { text: 'Bursts', is_correct: false }], type: 'multipleChoice' },
      { name: 'When an animal cell is placed in a hypotonic solution, it?', options: [{ text: 'Shrinks', is_correct: false }, { text: 'Remains unchanged', is_correct: false }, { text: 'Swells and may burst (lysis)', is_correct: true }, { text: 'Becomes plasmolysed', is_correct: false }], type: 'multipleChoice' },
      { name: 'When an animal cell is placed in a hypertonic solution, it?', options: [{ text: 'Swells up', is_correct: false }, { text: 'Bursts', is_correct: false }, { text: 'Shrinks (crenation)', is_correct: true }, { text: 'Remains the same', is_correct: false }], type: 'multipleChoice' },
      { name: 'Diffusion does NOT require?', options: [{ text: 'A concentration gradient', is_correct: false }, { text: 'Energy (ATP)', is_correct: true }, { text: 'Molecules to move', is_correct: false }, { text: 'A medium', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which of the following is an example of diffusion in biology?', options: [{ text: 'Active transport of glucose', is_correct: false }, { text: 'Oxygen moving into red blood cells', is_correct: true }, { text: 'Kidney filtering blood', is_correct: false }, { text: 'Muscle contraction', is_correct: false }], type: 'multipleChoice' },
      { name: 'Facilitated diffusion uses?', options: [{ text: 'ATP energy', is_correct: false }, { text: 'Protein channels, no energy needed', is_correct: true }, { text: 'Active pumps', is_correct: false }, { text: 'Vesicles', is_correct: false }], type: 'multipleChoice' },
      { name: 'The rate of diffusion increases with?', options: [{ text: 'Decreasing temperature', is_correct: false }, { text: 'Increasing concentration gradient', is_correct: true }, { text: 'Increasing membrane thickness', is_correct: false }, { text: 'Decreasing surface area', is_correct: false }], type: 'multipleChoice' },
      { name: 'Turgidity in plant cells is due to?', options: [{ text: 'Loss of water by osmosis', is_correct: false }, { text: 'Entry of water by osmosis', is_correct: true }, { text: 'Active transport of solutes', is_correct: false }, { text: 'Photosynthesis', is_correct: false }], type: 'multipleChoice' },
      { name: 'Plasmolysis occurs when plant cells?', options: [{ text: 'Gain water', is_correct: false }, { text: 'Lose water and membrane pulls away from wall', is_correct: true }, { text: 'Divide', is_correct: false }, { text: 'Photosynthesize', is_correct: false }], type: 'multipleChoice' },
      { name: 'The sodium-potassium pump is an example of?', options: [{ text: 'Passive transport', is_correct: false }, { text: 'Active transport', is_correct: true }, { text: 'Facilitated diffusion', is_correct: false }, { text: 'Osmosis', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which gas moves out of leaf cells by diffusion?', options: [{ text: 'Nitrogen', is_correct: false }, { text: 'Oxygen (during photosynthesis)', is_correct: true }, { text: 'Hydrogen', is_correct: false }, { text: 'Argon', is_correct: false }], type: 'multipleChoice' },
      { name: 'Stomata allow plants to?', options: [{ text: 'Absorb minerals', is_correct: false }, { text: 'Exchange gases by diffusion', is_correct: true }, { text: 'Absorb sunlight', is_correct: false }, { text: 'Store water', is_correct: false }], type: 'multipleChoice' },
      { name: 'Root hair cells absorb water from soil by?', options: [{ text: 'Active transport only', is_correct: false }, { text: 'Osmosis', is_correct: true }, { text: 'Pinocytosis', is_correct: false }, { text: 'Phagocytosis', is_correct: false }], type: 'multipleChoice' },
      { name: 'A semi-permeable membrane allows?', options: [{ text: 'All molecules to pass', is_correct: false }, { text: 'No molecules to pass', is_correct: false }, { text: 'Only selected molecules to pass', is_correct: true }, { text: 'Only large molecules to pass', is_correct: false }], type: 'multipleChoice' },
      { name: 'Water potential is highest in?', options: [{ text: 'Concentrated solution', is_correct: false }, { text: 'Pure water', is_correct: true }, { text: 'Salt solution', is_correct: false }, { text: 'Sugar solution', is_correct: false }], type: 'multipleChoice' },
      { name: 'Osmosis in cells is important for?', options: [{ text: 'Generating ATP', is_correct: false }, { text: 'Maintaining cell shape and water balance', is_correct: true }, { text: 'Protein synthesis', is_correct: false }, { text: 'DNA replication', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which type of transport moves substances against concentration gradient?', options: [{ text: 'Diffusion', is_correct: false }, { text: 'Osmosis', is_correct: false }, { text: 'Active transport', is_correct: true }, { text: 'Facilitated diffusion', is_correct: false }], type: 'multipleChoice' },
      { name: 'Dialysis in the kidney works on the principle of?', options: [{ text: 'Active transport', is_correct: false }, { text: 'Diffusion through a membrane', is_correct: true }, { text: 'Endocytosis', is_correct: false }, { text: 'Exocytosis', is_correct: false }], type: 'multipleChoice' },
      { name: 'Concentration gradient means?', options: [{ text: 'Equal concentration everywhere', is_correct: false }, { text: 'Difference in concentration between two areas', is_correct: true }, { text: 'No movement of molecules', is_correct: false }, { text: 'Concentration in the nucleus', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which of the following does NOT require a membrane?', options: [{ text: 'Osmosis', is_correct: false }, { text: 'Facilitated diffusion', is_correct: false }, { text: 'Simple diffusion in a gas', is_correct: true }, { text: 'Active transport', is_correct: false }], type: 'multipleChoice' },
      { name: 'When a plant wilts, it has lost?', options: [{ text: 'Chlorophyll', is_correct: false }, { text: 'Turgor pressure due to water loss', is_correct: true }, { text: 'Cell walls', is_correct: false }, { text: 'Ribosomes', is_correct: false }], type: 'multipleChoice' },
    ],
  },
  // ── Biodiversity / Kingdoms of Life – extra questions ──────────────────────
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Biodiversity',
    headingName: 'Kingdoms of Life', subHeadingName: '',
    questions: [
      { name: 'Which kingdom do spirogyra (green algae) belong to?', options: [{ text: 'Monera', is_correct: false }, { text: 'Protista', is_correct: true }, { text: 'Plantae', is_correct: false }, { text: 'Fungi', is_correct: false }], type: 'multipleChoice' },
      { name: 'Ringworm disease in humans is caused by?', options: [{ text: 'Bacteria', is_correct: false }, { text: 'Fungi', is_correct: true }, { text: 'Virus', is_correct: false }, { text: 'Protozoa', is_correct: false }], type: 'multipleChoice' },
      { name: 'Cholera is caused by organisms of kingdom?', options: [{ text: 'Fungi', is_correct: false }, { text: 'Protista', is_correct: false }, { text: 'Monera (bacteria)', is_correct: true }, { text: 'Animalia', is_correct: false }], type: 'multipleChoice' },
      { name: 'Sleeping sickness is caused by?', options: [{ text: 'Bacteria', is_correct: false }, { text: 'Trypanosoma (Protista)', is_correct: true }, { text: 'Virus', is_correct: false }, { text: 'Fungi', is_correct: false }], type: 'multipleChoice' },
      { name: 'Amoeba belongs to which kingdom?', options: [{ text: 'Animalia', is_correct: false }, { text: 'Protista', is_correct: true }, { text: 'Monera', is_correct: false }, { text: 'Fungi', is_correct: false }], type: 'multipleChoice' },
      { name: 'Flowering plants belong to which division of kingdom Plantae?', options: [{ text: 'Bryophyta', is_correct: false }, { text: 'Pteridophyta', is_correct: false }, { text: 'Angiospermae', is_correct: true }, { text: 'Gymnospermae', is_correct: false }], type: 'multipleChoice' },
      { name: 'Mosses belong to which division?', options: [{ text: 'Pteridophyta', is_correct: false }, { text: 'Bryophyta', is_correct: true }, { text: 'Angiospermae', is_correct: false }, { text: 'Gymnospermae', is_correct: false }], type: 'multipleChoice' },
      { name: 'Ferns belong to which division?', options: [{ text: 'Bryophyta', is_correct: false }, { text: 'Pteridophyta', is_correct: true }, { text: 'Angiospermae', is_correct: false }, { text: 'Gymnospermae', is_correct: false }], type: 'multipleChoice' },
      { name: 'Conifers (pine trees) belong to?', options: [{ text: 'Angiospermae', is_correct: false }, { text: 'Bryophyta', is_correct: false }, { text: 'Gymnospermae', is_correct: true }, { text: 'Pteridophyta', is_correct: false }], type: 'multipleChoice' },
      { name: 'The simplest plants are?', options: [{ text: 'Ferns', is_correct: false }, { text: 'Mosses', is_correct: true }, { text: 'Flowering plants', is_correct: false }, { text: 'Conifers', is_correct: false }], type: 'multipleChoice' },
      { name: 'An invertebrate is an animal?', options: [{ text: 'With a backbone', is_correct: false }, { text: 'Without a backbone', is_correct: true }, { text: 'Without cells', is_correct: false }, { text: 'That is microscopic', is_correct: false }], type: 'multipleChoice' },
      { name: 'Earthworm belongs to phylum?', options: [{ text: 'Arthropoda', is_correct: false }, { text: 'Annelida', is_correct: true }, { text: 'Mollusca', is_correct: false }, { text: 'Chordata', is_correct: false }], type: 'multipleChoice' },
      { name: 'Starfish belongs to phylum?', options: [{ text: 'Arthropoda', is_correct: false }, { text: 'Mollusca', is_correct: false }, { text: 'Echinodermata', is_correct: true }, { text: 'Annelida', is_correct: false }], type: 'multipleChoice' },
      { name: 'Snails belong to phylum?', options: [{ text: 'Arthropoda', is_correct: false }, { text: 'Mollusca', is_correct: true }, { text: 'Annelida', is_correct: false }, { text: 'Echinodermata', is_correct: false }], type: 'multipleChoice' },
      { name: 'Housefly belongs to phylum?', options: [{ text: 'Chordata', is_correct: false }, { text: 'Annelida', is_correct: false }, { text: 'Arthropoda', is_correct: true }, { text: 'Mollusca', is_correct: false }], type: 'multipleChoice' },
      { name: 'Amphibians include?', options: [{ text: 'Snakes', is_correct: false }, { text: 'Frogs and toads', is_correct: true }, { text: 'Lizards', is_correct: false }, { text: 'Fish only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which animals are warm-blooded?', options: [{ text: 'Fish and reptiles', is_correct: false }, { text: 'Birds and mammals', is_correct: true }, { text: 'Amphibians and fish', is_correct: false }, { text: 'All animals', is_correct: false }], type: 'multipleChoice' },
      { name: 'Mammals are unique in?', options: [{ text: 'Laying eggs', is_correct: false }, { text: 'Feeding young with milk', is_correct: true }, { text: 'Having gills', is_correct: false }, { text: 'Being cold-blooded', is_correct: false }], type: 'multipleChoice' },
      { name: 'Shark belongs to class?', options: [{ text: 'Osteichthyes (bony fish)', is_correct: false }, { text: 'Chondrichthyes (cartilaginous fish)', is_correct: true }, { text: 'Amphibia', is_correct: false }, { text: 'Reptilia', is_correct: false }], type: 'multipleChoice' },
      { name: 'Platypus is unusual because it is a mammal that?', options: [{ text: 'Has feathers', is_correct: false }, { text: 'Lays eggs', is_correct: true }, { text: 'Breathes water', is_correct: false }, { text: 'Has no fur', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which kingdom includes the only organisms that can fix atmospheric nitrogen directly?', options: [{ text: 'Fungi', is_correct: false }, { text: 'Plantae', is_correct: false }, { text: 'Monera (some bacteria)', is_correct: true }, { text: 'Animalia', is_correct: false }], type: 'multipleChoice' },
      { name: 'Kingdom Protista was proposed because some organisms?', options: [{ text: 'Were too small', is_correct: false }, { text: 'Did not fit neatly into plant or animal kingdoms', is_correct: true }, { text: 'Were always unicellular', is_correct: false }, { text: 'Were poisonous', is_correct: false }], type: 'multipleChoice' },
      { name: 'The cell of a bacterium is typically?', options: [{ text: '1 cm in diameter', is_correct: false }, { text: '1–10 micrometres in diameter', is_correct: true }, { text: '1 mm in diameter', is_correct: false }, { text: '100 micrometres in diameter', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which kingdom has photosynthetic members that are unicellular?', options: [{ text: 'Animalia', is_correct: false }, { text: 'Fungi', is_correct: false }, { text: 'Protista', is_correct: true }, { text: 'Monera only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Whales are classified as mammals because they?', options: [{ text: 'Live in water', is_correct: false }, { text: 'Breathe air and nurse young with milk', is_correct: true }, { text: 'Have fins', is_correct: false }, { text: 'Are large', is_correct: false }], type: 'multipleChoice' },
    ],
  },

  // ── Cells and Tissues / Tissues ────────────────────────────────────────────
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Cells and Tissues',
    headingName: 'Animal and Plant Cells', subHeadingName: '',
    questions: [
      { name: 'A tissue is a group of similar cells that perform?', options: [{ text: 'Different functions', is_correct: false }, { text: 'A common function', is_correct: true }, { text: 'No function', is_correct: false }, { text: 'Individual functions only', is_correct: false }], type: 'multipleChoice' },
      { name: 'The four main types of animal tissue are?', options: [{ text: 'Epithelial, connective, muscle, nervous', is_correct: true }, { text: 'Skin, bone, blood, nerve', is_correct: false }, { text: 'Cardiac, smooth, skeletal, epithelial', is_correct: false }, { text: 'Meristematic, vascular, ground, dermal', is_correct: false }], type: 'multipleChoice' },
      { name: 'Epithelial tissue lines?', options: [{ text: 'Muscles only', is_correct: false }, { text: 'Body surfaces and cavities', is_correct: true }, { text: 'Bones only', is_correct: false }, { text: 'Blood vessels only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Connective tissue connects and supports?', options: [{ text: 'Only nerves', is_correct: false }, { text: 'Other tissues and organs', is_correct: true }, { text: 'Only muscles', is_correct: false }, { text: 'Only skin', is_correct: false }], type: 'multipleChoice' },
      { name: 'Blood is classified as which type of tissue?', options: [{ text: 'Epithelial', is_correct: false }, { text: 'Connective', is_correct: true }, { text: 'Muscle', is_correct: false }, { text: 'Nervous', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which tissue transmits electrical signals?', options: [{ text: 'Epithelial', is_correct: false }, { text: 'Connective', is_correct: false }, { text: 'Nervous', is_correct: true }, { text: 'Muscle', is_correct: false }], type: 'multipleChoice' },
      { name: 'Smooth muscle tissue is found in?', options: [{ text: 'Heart only', is_correct: false }, { text: 'Arms and legs', is_correct: false }, { text: 'Walls of internal organs', is_correct: true }, { text: 'Skin only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Cardiac muscle is found only in?', options: [{ text: 'Lungs', is_correct: false }, { text: 'The heart', is_correct: true }, { text: 'The liver', is_correct: false }, { text: 'Bones', is_correct: false }], type: 'multipleChoice' },
      { name: 'Skeletal muscle is also called?', options: [{ text: 'Involuntary muscle', is_correct: false }, { text: 'Voluntary muscle', is_correct: true }, { text: 'Cardiac muscle', is_correct: false }, { text: 'Smooth muscle', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which plant tissue is responsible for growth?', options: [{ text: 'Xylem', is_correct: false }, { text: 'Phloem', is_correct: false }, { text: 'Meristematic tissue', is_correct: true }, { text: 'Parenchyma', is_correct: false }], type: 'multipleChoice' },
      { name: 'Xylem tissue in plants transports?', options: [{ text: 'Food (glucose)', is_correct: false }, { text: 'Water and minerals', is_correct: true }, { text: 'Oxygen only', is_correct: false }, { text: 'Hormones only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Phloem tissue in plants transports?', options: [{ text: 'Water only', is_correct: false }, { text: 'Minerals only', is_correct: false }, { text: 'Food (sugars)', is_correct: true }, { text: 'Oxygen', is_correct: false }], type: 'multipleChoice' },
      { name: 'Bone is an example of which tissue?', options: [{ text: 'Epithelial', is_correct: false }, { text: 'Connective', is_correct: true }, { text: 'Muscle', is_correct: false }, { text: 'Nervous', is_correct: false }], type: 'multipleChoice' },
      { name: 'Neurons are the functional units of?', options: [{ text: 'Muscle tissue', is_correct: false }, { text: 'Connective tissue', is_correct: false }, { text: 'Nervous tissue', is_correct: true }, { text: 'Epithelial tissue', is_correct: false }], type: 'multipleChoice' },
      { name: 'Parenchyma is the main tissue of?', options: [{ text: 'Animal muscle', is_correct: false }, { text: 'Plant leaves (photosynthesis)', is_correct: true }, { text: 'Animal skin', is_correct: false }, { text: 'Bone marrow', is_correct: false }], type: 'multipleChoice' },
      { name: 'Cartilage is a type of which tissue?', options: [{ text: 'Epithelial', is_correct: false }, { text: 'Connective', is_correct: true }, { text: 'Nervous', is_correct: false }, { text: 'Muscle', is_correct: false }], type: 'multipleChoice' },
      { name: 'Adipose tissue stores?', options: [{ text: 'Glycogen', is_correct: false }, { text: 'Fat', is_correct: true }, { text: 'Protein', is_correct: false }, { text: 'Water', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which plant tissue provides mechanical support?', options: [{ text: 'Parenchyma', is_correct: false }, { text: 'Sclerenchyma', is_correct: true }, { text: 'Meristematic', is_correct: false }, { text: 'Phloem', is_correct: false }], type: 'multipleChoice' },
      { name: 'Epidermis in plants is a type of which tissue?', options: [{ text: 'Vascular', is_correct: false }, { text: 'Dermal', is_correct: true }, { text: 'Ground', is_correct: false }, { text: 'Meristematic', is_correct: false }], type: 'multipleChoice' },
      { name: 'Organs are made up of?', options: [{ text: 'Single cells only', is_correct: false }, { text: 'Two or more tissues working together', is_correct: true }, { text: 'Molecules', is_correct: false }, { text: 'Single tissue only', is_correct: false }], type: 'multipleChoice' },
      { name: 'The heart is an example of an?', options: [{ text: 'Organelle', is_correct: false }, { text: 'Organ', is_correct: true }, { text: 'Tissue', is_correct: false }, { text: 'Cell', is_correct: false }], type: 'multipleChoice' },
      { name: 'The correct order of organization from smallest to largest is?', options: [{ text: 'Organ, tissue, cell, organism', is_correct: false }, { text: 'Cell, tissue, organ, organism', is_correct: true }, { text: 'Tissue, cell, organ, organism', is_correct: false }, { text: 'Organism, organ, tissue, cell', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which tissue is responsible for sensation and coordination?', options: [{ text: 'Muscle tissue', is_correct: false }, { text: 'Connective tissue', is_correct: false }, { text: 'Nervous tissue', is_correct: true }, { text: 'Epithelial tissue', is_correct: false }], type: 'multipleChoice' },
      { name: 'Cork cells observed by Robert Hooke were?', options: [{ text: 'Living plant cells', is_correct: false }, { text: 'Dead plant cells forming walls', is_correct: true }, { text: 'Animal cells', is_correct: false }, { text: 'Bacterial cells', is_correct: false }], type: 'multipleChoice' },
      { name: 'Collenchyma tissue in plants provides?', options: [{ text: 'Water transport', is_correct: false }, { text: 'Flexible support', is_correct: true }, { text: 'Food storage', is_correct: false }, { text: 'Photosynthesis only', is_correct: false }], type: 'multipleChoice' },
    ],
  },
  // ── Introduction to Biology / What is Biology? – extra ─────────────────────
  {
    className: 'class-9', bookName: 'Biology', chapterName: 'Introduction to Biology',
    headingName: 'Branches of Biology', subHeadingName: '',
    questions: [
      { name: 'The study of the structure and function of the immune system is?', options: [{ text: 'Endocrinology', is_correct: false }, { text: 'Immunology', is_correct: true }, { text: 'Haematology', is_correct: false }, { text: 'Neurology', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which branch studies animal behaviour in natural environments?', options: [{ text: 'Zoology', is_correct: false }, { text: 'Ethology', is_correct: true }, { text: 'Ecology', is_correct: false }, { text: 'Taxonomy', is_correct: false }], type: 'multipleChoice' },
      { name: 'The study of plants used as medicines is?', options: [{ text: 'Botany', is_correct: false }, { text: 'Ethnobotany', is_correct: true }, { text: 'Horticulture', is_correct: false }, { text: 'Agronomy', is_correct: false }], type: 'multipleChoice' },
      { name: 'Biostatistics is used in biology to?', options: [{ text: 'Design organisms', is_correct: false }, { text: 'Analyze and interpret data statistically', is_correct: true }, { text: 'Classify organisms', is_correct: false }, { text: 'Observe cells', is_correct: false }], type: 'multipleChoice' },
      { name: 'The study of how drugs affect living organisms is?', options: [{ text: 'Biochemistry', is_correct: false }, { text: 'Pharmacology', is_correct: true }, { text: 'Physiology', is_correct: false }, { text: 'Pathology', is_correct: false }], type: 'multipleChoice' },
      { name: 'Dendrochronology is the study of?', options: [{ text: 'Fossils', is_correct: false }, { text: 'Tree rings to determine age', is_correct: true }, { text: 'Bacteria', is_correct: false }, { text: 'DNA sequences', is_correct: false }], type: 'multipleChoice' },
      { name: 'Limnology is the study of?', options: [{ text: 'Oceans', is_correct: false }, { text: 'Freshwater ecosystems', is_correct: true }, { text: 'Deserts', is_correct: false }, { text: 'Forests', is_correct: false }], type: 'multipleChoice' },
      { name: 'The study of the distribution of organisms in geological time is?', options: [{ text: 'Taxonomy', is_correct: false }, { text: 'Palaeontology', is_correct: true }, { text: 'Ecology', is_correct: false }, { text: 'Biogeography', is_correct: false }], type: 'multipleChoice' },
      { name: 'Ecotoxicology studies?', options: [{ text: 'Toxic chemicals in ecosystems', is_correct: true }, { text: 'Toxic animals', is_correct: false }, { text: 'Toxic plants only', is_correct: false }, { text: 'Human toxins only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which branch of biology deals with hereditary diseases?', options: [{ text: 'Ecology', is_correct: false }, { text: 'Medical genetics', is_correct: true }, { text: 'Physiology', is_correct: false }, { text: 'Anatomy', is_correct: false }], type: 'multipleChoice' },
      { name: 'Reproductive biology studies?', options: [{ text: 'Digestive processes', is_correct: false }, { text: 'Reproduction in organisms', is_correct: true }, { text: 'Photosynthesis', is_correct: false }, { text: 'Cell division only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which branch of biology applies to food production and preservation?', options: [{ text: 'Food microbiology', is_correct: true }, { text: 'Neurobiology', is_correct: false }, { text: 'Cardiology', is_correct: false }, { text: 'Herpetology', is_correct: false }], type: 'multipleChoice' },
      { name: 'Evolutionary biology studies?', options: [{ text: 'How species change over time', is_correct: true }, { text: 'How cells divide', is_correct: false }, { text: 'How ecosystems form', is_correct: false }, { text: 'How drugs work', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which branch uses biology to solve crimes?', options: [{ text: 'Forensic biology', is_correct: true }, { text: 'Marine biology', is_correct: false }, { text: 'Neurobiology', is_correct: false }, { text: 'Cell biology', is_correct: false }], type: 'multipleChoice' },
      { name: 'Stem cell biology is important for?', options: [{ text: 'Weather forecasting', is_correct: false }, { text: 'Medical treatments and regenerative medicine', is_correct: true }, { text: 'Agriculture only', is_correct: false }, { text: 'Space exploration only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Sociobiology studies?', options: [{ text: 'Social behaviour in animals from a biological perspective', is_correct: true }, { text: 'Political systems', is_correct: false }, { text: 'Cultural traditions', is_correct: false }, { text: 'Economic systems', is_correct: false }], type: 'multipleChoice' },
      { name: 'Conservation biology aims to?', options: [{ text: 'Hunt endangered species', is_correct: false }, { text: 'Protect biodiversity and ecosystems', is_correct: true }, { text: 'Clone all species', is_correct: false }, { text: 'Breed animals for food only', is_correct: false }], type: 'multipleChoice' },
      { name: 'Biomechanics applies which principles to biology?', options: [{ text: 'Chemical', is_correct: false }, { text: 'Mechanical and physical', is_correct: true }, { text: 'Genetic', is_correct: false }, { text: 'Ecological', is_correct: false }], type: 'multipleChoice' },
      { name: 'Chronobiology studies?', options: [{ text: 'Fossils', is_correct: false }, { text: 'Biological rhythms and clocks', is_correct: true }, { text: 'DNA replication timing', is_correct: false }, { text: 'Age of organisms', is_correct: false }], type: 'multipleChoice' },
      { name: 'Plant physiology studies?', options: [{ text: 'Plant classification', is_correct: false }, { text: 'Functions and processes in plants', is_correct: true }, { text: 'Plant fossils', is_correct: false }, { text: 'Plant distribution', is_correct: false }], type: 'multipleChoice' },
      { name: 'Animal physiology studies?', options: [{ text: 'Classification of animals', is_correct: false }, { text: 'Functions and processes in animals', is_correct: true }, { text: 'Animal fossils', is_correct: false }, { text: 'Animal distribution', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which field applies computer algorithms to analyse biological data?', options: [{ text: 'Bionics', is_correct: false }, { text: 'Bioinformatics', is_correct: true }, { text: 'Bioengineering', is_correct: false }, { text: 'Biochemistry', is_correct: false }], type: 'multipleChoice' },
      { name: 'Proteomics is the study of?', options: [{ text: 'DNA sequences', is_correct: false }, { text: 'The complete set of proteins in a cell', is_correct: true }, { text: 'RNA molecules', is_correct: false }, { text: 'Lipids in membranes', is_correct: false }], type: 'multipleChoice' },
      { name: 'Genomics is the study of?', options: [{ text: 'Individual genes only', is_correct: false }, { text: 'Complete genomes of organisms', is_correct: true }, { text: 'Proteins only', is_correct: false }, { text: 'Ecosystems', is_correct: false }], type: 'multipleChoice' },
      { name: 'Which branch studies how environment affects gene expression (without changing DNA)?', options: [{ text: 'Genetics', is_correct: false }, { text: 'Epigenetics', is_correct: true }, { text: 'Genomics', is_correct: false }, { text: 'Proteomics', is_correct: false }], type: 'multipleChoice' },
    ],
  },
];

export async function seedMcqs() {
  const skipped: string[] = [];
  let createdCount = 0;
  let updatedCount = 0;

  try {
    console.log('Starting MCQ seed...');

    for (const raw of mcqs) {
      const classSlug = raw.className.toLowerCase().trim();
      const bookSlug = slugify(raw.bookName);
      const chapterSlug = slugify(raw.chapterName);

      const classDoc = await Class.findOne({ status: 'active', slug: classSlug });
      if (!classDoc) {
        console.log(`Skipping "${raw.chapterName}": class not found.`);
        skipped.push(`${raw.className} - ${raw.bookName} - ${raw.chapterName}`);
        continue;
      }

      const bookDoc = await Book.findOne({ slug: bookSlug, classId: classDoc._id, status: 'active' });
      if (!bookDoc) {
        console.log(`Skipping "${raw.chapterName}": book "${raw.bookName}" not found.`);
        skipped.push(`${raw.className} - ${raw.bookName} - ${raw.chapterName}`);
        continue;
      }

      const chapterDoc = await Chapter.findOne({ slug: chapterSlug, bookId: bookDoc._id, status: 'active' });
      if (!chapterDoc) {
        console.log(`Skipping "${raw.chapterName}": chapter not found.`);
        skipped.push(`${raw.className} - ${raw.bookName} - ${raw.chapterName}`);
        continue;
      }

      let headingDoc: any = null;
      if (raw.headingName) {
        headingDoc = await Heading.findOne({ slug: slugify(raw.headingName), chapterId: chapterDoc._id });
      }

      let subHeadingDoc: any = null;
      if (raw.subHeadingName && headingDoc) {
        subHeadingDoc = await SubHeading.findOne({ slug: slugify(raw.subHeadingName), headingId: headingDoc._id });
      }

      for (const q of raw.questions) {
        const mcqSlug = slugify(q.name);
        const correctOptionIndex = q.options.findIndex(opt => opt.is_correct);

        const existing = await Mcqs.findOne({ slug: mcqSlug });
        if (existing) {
          existing.name = q.name;
          existing.question = q.name;
          existing.options = q.options.map(o => o.text);
          existing.correctOption = correctOptionIndex >= 0 ? correctOptionIndex : 0;
          existing.classId = classDoc._id;
          existing.bookId = bookDoc._id;
          existing.chapterId = chapterDoc._id;
          existing.headingId = headingDoc?._id;
          existing.subHeadingId = subHeadingDoc?._id;
          await existing.save();
          updatedCount += 1;
          console.log(`Updated MCQ: ${q.name}`);
          continue;
        }

        await Mcqs.create({
          name: q.name,
          slug: mcqSlug,
          question: q.name,
          options: q.options.map(o => o.text),
          correctOption: correctOptionIndex >= 0 ? correctOptionIndex : 0,
          status: 'active',
          classId: classDoc._id,
          bookId: bookDoc._id,
          chapterId: chapterDoc._id,
          headingId: headingDoc?._id,
          subHeadingId: subHeadingDoc?._id,
        });

        createdCount += 1;
        console.log(`Created MCQ: ${q.name}`);
      }
    }

    console.log('MCQ seeding completed.');
    console.log(`Created: ${createdCount}, Updated: ${updatedCount}, Skipped: ${skipped.length}`);
  } catch (error) {
    console.error('Error seeding MCQs:', error);
    throw error;
  }
}
