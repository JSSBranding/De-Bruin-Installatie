import { getCollection, type CollectionEntry } from 'astro:content';
import { showDemoContent } from '../config/site';

export type Service = CollectionEntry<'diensten'>;
export type Project = CollectionEntry<'projecten'>;

export async function getServices(): Promise<Service[]> {
  const all = await getCollection('diensten');
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Canonieke URL van een dienst (onderhoud heeft een eigen pagina buiten /diensten/). */
export function serviceHref(service: Service): string {
  return service.data.canonicalPath ?? `/diensten/${service.id}/`;
}

/** Projecten die in deze omgeving gepubliceerd mogen worden. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projecten', ({ data }) => !data.draft && (showDemoContent || !data.demo));
  return all.sort((a, b) => (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0));
}

export function projectHref(project: Project): string {
  return `/projecten/${project.id}/`;
}
