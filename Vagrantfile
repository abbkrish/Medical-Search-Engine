VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "hashicorp/precise32"
    
  config.vm.provision "shell" do |s|
    s.path = "node_install.sh"
  end

  config.vm.network :forwarded_port, host: 4572, guest: 80
  config.vm.network :forwarded_port, host: 4570, guest: 3000
  config.vm.network :forwarded_port, host: 4571, guest: 4000
end
