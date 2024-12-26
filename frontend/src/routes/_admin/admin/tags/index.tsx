import {createFileRoute, Link} from '@tanstack/react-router';
import { Edit, Trash, Tag } from 'lucide-react';
import PrimaryButton from "@/components/Buttons/PrimaryButton.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchAllTags, useDeleteTag} from "@/service/blogs.ts";
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {useState} from "react";

export const Route = createFileRoute('/_admin/admin/tags/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Track modal open state
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  const { error, data, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchAllTags,
  });

  const deleteTagMutation = useDeleteTag();

  const handleDelete = () => {
    if (selectedTagId) {
      deleteTagMutation.mutate(selectedTagId);
      setIsDialogOpen(false);
      setSelectedTagId(null);
    }
  };

  if (error) {
    return <div>There was some sort of error. Please try again.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="flex gap-2 text-3xl font-extrabold text-gray-800">
              <Tag className="w-6 h-9 text-gray-400" />
              Manage Tags
            </h1>
            <Link to="/admin/tags/create">
              <PrimaryButton className="hover:bg-purple-100 hover:text-purple-600">+ New Tag</PrimaryButton>
            </Link>
          </div>
          {
            (!isLoading && data?.length === 0) ?
                <div>No tags available</div> :
                (
                    <table className="min-w-full border-collapse md:table">
                      <thead className="block md:table-header-group">
                      <tr className="border-b border-gray-200 block md:table-row">
                        <th className="block md:table-cell p-3 text-left text-gray-600 font-medium">S.No</th>
                        <th className="block md:table-cell p-3 text-left text-gray-600 font-medium">Tag Name</th>
                        <th className="block md:table-cell p-3 text-left text-gray-600 font-medium">Actions</th>
                      </tr>
                      </thead>
                      <tbody className="block md:table-row-group">
                      {data?.map((tag, index) => (
                          <tr key={tag.id} className="border-b border-gray-200 block md:table-row">
                            <td className="block md:table-cell p-3 text-gray-700">{index + 1}</td>
                            <td className="block md:table-cell p-3 text-gray-700">
                              <div className="flex items-center space-x-2">
                                <span>{tag.tagName}</span>
                              </div>
                            </td>
                            <td className="block md:table-cell p-3">
                              <div className="flex flex-wrap gap-2">
                                <Link to="/tags/$id/blogs" params={{id: tag.id}}>
                                  <Button
                                      type={"button"}
                                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-full shadow-md hover:bg-gray-300 flex items-center space-x-1"
                                  >
                                    <Tag className="w-4 h-4"/>
                                    <span>Blogs</span>
                                  </Button>
                                </Link>
                                <Link to={'/admin/tags/create'}>
                                  <Button
                                      type={"button"}
                                      className="px-3 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 flex items-center space-x-1"
                                  >
                                    <Edit className="w-4 h-4"/>
                                    <span>Edit</span>
                                  </Button>
                                </Link>
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                  <DialogTrigger asChild>
                                    <Button
                                        type={"button"}
                                        onClick={() => {
                                          setSelectedTagId(tag.id);
                                          setIsDialogOpen(true);
                                        }}
                                        className="px-3 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 flex items-center space-x-1"
                                    >
                                      <Trash className="w-4 h-4"/>
                                      <span>Delete</span>
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-md">
                                    <h3 className="text-lg font-bold">Confirm Deletion</h3>
                                    <p>Are you sure you want to delete this tag?</p>
                                    <DialogFooter>
                                      <Button
                                          variant="ghost"
                                          onClick={() => {
                                            setIsDialogOpen(false);
                                            setSelectedTagId(null);
                                          }}
                                      >
                                        Cancel
                                      </Button>
                                      <Button variant="destructive" onClick={handleDelete}>
                                        Confirm
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                )
          }
        </div>
      </div>
  );
}
